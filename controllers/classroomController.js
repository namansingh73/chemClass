const Classroom = require('../models/classroomModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');

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

exports.postAnnouncement = catchAsync(async (req, res, next) => {
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

  const post = await Post.create({
    text: req.body.text,
    classroom: classroom.id,
  });

  res.status(201).json({
    status: 'success',
    messsage: 'Post created successfully!',
    post,
  });
});

exports.postComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate('classroom');

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
