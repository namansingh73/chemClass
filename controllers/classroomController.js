const multer = require('multer');
const Classroom = require('../models/classroomModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const {
  uploadMultipleFilesCloudinary,
  uploadSingleFileCloudinary,
  deleteSingleFileCloudinary,
} = require('../cloudinary');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not a valid doc! Please upload images and pdfs only.', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: multerFilter,
});

exports.createClassroomAddInstructor = (req, res, next) => {
  req.body = {
    name: req.body.name,
    meetLink: req.body.meetLink,
    instructor: req.user.id,
  };

  next();
};

exports.createClassroom = factory.createOne(Classroom);

exports.joinClassroom = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findOne({
    classCode: req.params.uuid,
  });

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() === req.user.id) {
    throw new AppError('Instructor cannot join own class', 400);
  }

  if (
    classroom.students.find((student) => student.toString() === req.user.id)
  ) {
    throw new AppError('Classroom already joined', 400);
  }

  classroom.students.push(req.user.id);
  await classroom.save();
  res.status(200).json({
    status: 'success',
    messsage: 'Class joined successfully!',
  });
});

exports.postComment = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId).populate('classroom');

  if (!post) {
    throw new AppError('Post not found', 400);
  }

  if (
    (post.classroom.instructor.toString() !== req.user.id &&
      !post.classroom.students.find(
        (student) => student.toString() === req.user.id
      )) ||
    post.classroom.disabledStudents.find(
      (student) => student.toString() === req.user.id
    )
  ) {
    throw new AppError(
      'You dont have the permissions to perform the action',
      401
    );
  }

  post.comments.push({
    user: req.user.id,
    text: req.body.text,
  });
  await post.save();

  await post.populate({
    path: 'comments.user',
    select: ['name', 'photo'],
  });

  post = post.toObject();

  if (post.postType === 'assignment') {
    post.assignmentDetails.submission = post.assignmentDetails.submissions.find(
      (submission) => submission.student.toString() === req.user.id
    );
    post.assignmentDetails.submissions = undefined;
  }

  res.status(201).json({
    status: 'success',
    messsage: 'Comment added successfully!',
    post,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    _id: req.params.postId,
    'comments._id': req.params.commentId,
  }).populate('classroom');

  if (!post) {
    throw new AppError('Comment not found', 400);
  }

  const commentIdx = post.comments.findIndex(
    (comment) => comment.id === req.params.commentId
  );

  if (
    post.classroom.instructor.toString() !== req.user.id &&
    post.comments[commentIdx].user.toString() !== req.user.id &&
    post.classroom.disabledStudents.find(
      (student) => student.toString() === req.user.id
    )
  ) {
    throw new AppError(
      'You dont have the permissions to perform the action',
      401
    );
  }

  post.comments.splice(commentIdx, 1);
  await post.save();

  res.status(204).json({
    status: 'success',
    messsage: 'Comment deleted successfully!',
  });
});

exports.uploadFilesPost = upload.array('attachments', 10);

exports.postaPost = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.classId);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError(
      'You dont have the permissions to perform the action',
      401
    );
  }

  let assignmentDetails;

  if (req.query.postType === 'assignment') {
    assignmentDetails = {
      due: req.body.due,
    };
  }

  let attachments = [];

  if (req.files?.length) {
    const cloudinaryResponses = await uploadMultipleFilesCloudinary(
      req.files.map((file) => file.buffer),
      'chemClass/posts'
    );

    attachments = [];

    for (let i = 0; i < req.files.length; i += 1) {
      attachments.push({
        ...cloudinaryResponses[i],
        originalName: req.files[i].originalname,
      });
    }
  }

  let post;

  try {
    post = await Post.create({
      text: req.body.text,
      classroom: classroom.id,
      postType: req.query.postType,
      assignmentDetails,
      attachments,
    });
  } catch (err) {
    await Promise.allSettled(attachments.map(({ public_id }) => public_id));
    throw err;
  }

  res.status(201).json({
    status: 'success',
    messsage: 'Post created successfully!',
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate('classroom');

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  if (post.classroom.instructor.toString() !== req.user.id) {
    throw new AppError(
      'You dont have the permissions to perform the action',
      401
    );
  }

  await post.remove();

  res.status(204).json({
    status: 'success',
    messsage: 'Post deleted successfully!',
  });
});

exports.uploadFileSubmission = upload.single('attachment');

exports.postAssignmentSubmission = catchAsync(async (req, res, next) => {
  if (!req.file) {
    throw new AppError('Attachment cannot be empty!', 400);
  }

  let post = await Post.findById(req.params.postId).populate('classroom');

  if (!post || post.postType !== 'assignment') {
    throw new AppError('Assignment not found', 400);
  }

  if (
    !post.classroom.students.find(
      (student) => student.toString() === req.user.id
    ) ||
    post.classroom.disabledStudents.find(
      (student) => student.toString() === req.user.id
    )
  ) {
    throw new AppError(
      'You dont have the permissions to perform the action',
      401
    );
  }

  let cloudinaryRes;

  try {
    cloudinaryRes = await uploadSingleFileCloudinary(
      req.file.buffer,
      'chemClass/assignmentSubmissions'
    );
  } catch (err) {
    throw new AppError('Please try again later', 400);
  }

  const submissionIndex = post.assignmentDetails.submissions.findIndex(
    (submission) => submission.student.toString() === req.user.id.toString()
  );

  let oldSubmissionId;

  if (submissionIndex !== -1) {
    oldSubmissionId =
      post.assignmentDetails.submissions[submissionIndex].attachment.public_id;
    post.assignmentDetails.submissions[submissionIndex].attachment =
      cloudinaryRes;
    post.assignmentDetails.submissions[submissionIndex].submittedAt =
      Date.now();
  } else {
    post.assignmentDetails.submissions.push({
      student: req.user.id,
      attachment: cloudinaryRes,
    });
  }

  try {
    await post.save();

    if (oldSubmissionId) {
      await deleteSingleFileCloudinary(oldSubmissionId);
    }
  } catch (err) {
    await deleteSingleFileCloudinary(cloudinaryRes.public_id);
    throw err;
  }

  await post.populate({
    path: 'comments.user',
    select: ['name', 'photo'],
  });

  post = post.toObject();

  post.assignmentDetails.submission = post.assignmentDetails.submissions.find(
    (submission) => submission.student.toString() === req.user.id
  );
  post.assignmentDetails.submissions = undefined;

  res.status(201).json({
    status: 'success',
    messsage: 'Assignment submission successful!',
    post,
  });
});

exports.getAssignmentSubmissions = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate(
    'classroom',
    'instructor'
  );

  if (!post || post.postType !== 'assignment') {
    throw new AppError('Assignment not found', 400);
  }

  if (post.classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  res.status(200).json({
    status: 'success',
    messsage: 'Get assignment submissions successful!',
    submissions: post.assignmentDetails.submissions,
  });
});

exports.getClassrooms = catchAsync(async (req, res, next) => {
  const classrooms = await Classroom.aggregate([
    {
      $match: {
        $or: [
          { instructor: req.user._id },
          {
            $and: [
              { students: req.user._id },
              { disabledStudents: { $ne: req.user._id } },
            ],
          },
        ],
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $addFields: {
        studentCount: {
          $size: '$students',
        },
      },
    },
    {
      $project: {
        students: 0,
      },
    },
    {
      $lookup: {
        from: 'posts',
        let: { classroomId: '$_id' },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $eq: ['$$classroomId', '$classroom'],
                  },
                },
                {
                  postType: 'assignment',
                  'assignmentDetails.submissions.student': {
                    $ne: req.user._id,
                  },
                },
              ],
            },
          },
          {
            $project: {
              _id: 1,
            },
          },
        ],
        as: 'assignments',
      },
    },
    {
      $addFields: {
        unsubmittedAssignmentCount: {
          $cond: {
            if: {
              $ne: ['$instructor', req.user._id],
            },
            then: {
              $size: '$assignments',
            },
            else: null,
          },
        },
      },
    },
    {
      $project: {
        assignments: 0,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'instructor',
        foreignField: '_id',
        as: 'instructorObjs',
      },
    },
    {
      $addFields: {
        instructorObj: {
          $first: '$instructorObjs',
        },
      },
    },
    {
      $addFields: {
        instructorName: '$instructorObj.name',
      },
    },
    {
      $project: {
        instructorObjs: 0,
        instructorObj: 0,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: classrooms,
  });
});

exports.getSingleClassroom = catchAsync(async (req, res, next) => {
  let classroom = await Classroom.findById(req.params.id);

  if (
    !classroom ||
    (classroom.instructor.toString() !== req.user.id &&
      !classroom.students.find(
        (student) => student.toString() === req.user.id
      )) ||
    classroom.disabledStudents.find(
      (student) => student.toString() === req.user.id
    )
  ) {
    throw new AppError("Classroom doesn't exists", 404);
  }

  await classroom.populate([
    {
      path: 'posts',
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: {
        path: 'comments.user',
        select: ['name', 'photo'],
      },
    },
    {
      path: 'students',
      select: ['name', 'photo'],
      options: {
        sort: {
          name: 1,
        },
      },
    },
    {
      path: 'instructor',
      select: ['name', 'photo'],
    },
  ]);

  classroom = classroom.toObject();

  classroom.posts.forEach((post) => {
    if (post.postType !== 'assignment') {
      return;
    }

    post.assignmentDetails.submission = post.assignmentDetails.submissions.find(
      (submission) => submission.student.toString() === req.user.id
    );

    post.assignmentDetails.submissions = undefined;
  });

  res.status(200).json({
    status: 'success',
    data: classroom,
  });
});

exports.updateClassroom = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  if (req.body.name) {
    classroom.name = req.body.name;
  }

  if (req.body.meetLink) {
    classroom.meetLink = req.body.meetLink;
  }

  await classroom.save();

  await classroom.populate([
    {
      path: 'posts',
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: {
        path: 'comments.user',
        select: ['name', 'photo'],
      },
    },
    {
      path: 'students',
      select: ['name', 'photo'],
      options: {
        sort: {
          name: 1,
        },
      },
    },
    {
      path: 'instructor',
      select: ['name', 'photo'],
    },
  ]);

  classroom.submissions = undefined;

  res.status(200).json({
    status: 'success',
    messsage: 'Class updated successfully!',
    classroom,
  });
});

exports.archiveClassroom = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.classroomId);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  classroom.archived = true;

  await classroom.save();

  res.status(200).json({
    status: 'success',
    messsage: 'Class archived successfully!',
  });
});

exports.unarchiveClassroom = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.classroomId);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  classroom.archived = false;

  await classroom.save();

  res.status(200).json({
    status: 'success',
    messsage: 'Class unarchived successfully!',
  });
});

exports.disableStudent = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.classroomId);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  if (
    classroom.students.find(
      (student) => student.toString() === req.params.studentId
    )
  ) {
    if (
      !classroom.disabledStudents.find(
        (student) => student.toString() === req.params.studentId
      )
    ) {
      classroom.disabledStudents.push(req.params.studentId);
    } else {
      throw new AppError('Student already disabled', 400);
    }
  } else {
    throw new AppError('Student not found', 400);
  }

  await classroom.save();

  await classroom.populate([
    {
      path: 'posts',
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: {
        path: 'comments.user',
        select: ['name', 'photo'],
      },
    },
    {
      path: 'students',
      select: ['name', 'photo'],
      options: {
        sort: {
          name: 1,
        },
      },
    },
    {
      path: 'instructor',
      select: ['name', 'photo'],
    },
  ]);

  classroom.submissions = undefined;

  res.status(200).json({
    status: 'success',
    messsage: 'Student disabled successfully!',
    classroom,
  });
});

exports.enableStudent = catchAsync(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.classroomId);

  if (!classroom) {
    throw new AppError('Classroom not found', 400);
  }

  if (classroom.instructor.toString() !== req.user.id) {
    throw new AppError("You don't have permission to perform this action", 400);
  }

  if (
    classroom.disabledStudents.find(
      (student) => student.toString() === req.params.studentId
    )
  ) {
    classroom.disabledStudents = classroom.disabledStudents.filter(
      (student) => student.toString() !== req.params.studentId
    );
  } else {
    throw new AppError('Student not found or not disabled', 400);
  }

  await classroom.save();

  await classroom.populate([
    {
      path: 'posts',
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: {
        path: 'comments.user',
        select: ['name', 'photo'],
      },
    },
    {
      path: 'students',
      select: ['name', 'photo'],
      options: {
        sort: {
          name: 1,
        },
      },
    },
    {
      path: 'instructor',
      select: ['name', 'photo'],
    },
  ]);

  classroom.submissions = undefined;

  res.status(200).json({
    status: 'success',
    messsage: 'Student enabled successfully!',
    classroom,
  });
});

exports.getAssignmentSummary = catchAsync(async (req, res, next) => {
  const classrooms = await Classroom.find(
    {
      students: req.user._id,
      disabledStudents: {
        $ne: req.user.id,
      },
    },
    {
      _id: 1,
      name: 1,
    }
  );

  let posts = await Post.find(
    {
      postType: 'assignment',
      classroom: classrooms,
    },
    {
      classroom: 1,
      text: 1,
      assignmentDetails: 1,
    }
  );

  posts = posts.map((post) => post.toObject());

  posts.forEach((post) => {
    post.classroom = classrooms.find(
      (classroom) => post.classroom.toString() === classroom.id
    );

    post.assignmentDetails.submitted =
      !!post.assignmentDetails.submissions.find(
        (submission) => submission.student.toString() === req.user.id
      );

    post.assignmentDetails.submissions = undefined;
  });

  res.status(200).json({
    status: 'success',
    assignments: posts,
  });
});
