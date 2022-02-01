const multer = require('multer');
const Classroom = require('../models/classroomModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
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
    post.classroom.instructor.toString() !== req.user.id &&
    !post.classroom.students.find(
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
    post.comments[commentIdx].user.toString() !== req.user.id
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

  let assignmentDetails = undefined;

  if (req.query.postType === 'assignment') {
    assignmentDetails = {
      due: req.body.assignmentDetails?.due,
    };
  }

  let attachments = undefined;

  if (req.files?.length) {
    const cloudinaryResponses = await uploadMultipleFilesCloudinary(
      req.files.map((file) => file.buffer),
      'chemClass/posts'
    );

    attachments = [];

    for (let i = 0; i < req.files.length; ++i) {
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
    throw new AppError('Abe ghoda hai kya, khali submit karega?', 400);
  }

  const post = await Post.findById(req.params.postId).populate('classroom');

  if (!post || post.postType !== 'assignment') {
    throw new AppError('Assignment not found', 400);
  }

  if (
    !post.classroom.students.find(
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
    console.log(err);
    throw new AppError('Baad me aa jayio, kar doonga', 400);
  }

  const submissionIndex = post.assignmentDetails.submissions.findIndex(
    (submission) => submission.student.toString() === req.user.id.toString()
  );

  let oldSubmissionId = undefined;

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

  res.status(201).json({
    status: 'success',
    messsage: 'Assignment submission successful!',
    post,
  });
});

exports.getClassrooms = catchAsync(async (req, res, next) => {
  const classrooms = await Classroom.aggregate([
    {
      $match: {
        $or: [{ instructor: req.user._id }, { students: req.user._id }],
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
      !classroom.students.find((student) => student.toString() === req.user.id))
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
