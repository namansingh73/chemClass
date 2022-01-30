const express = require('express');
const authController = require('./../controllers/authController');
const classroomController = require('../controllers/classroomController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(classroomController.getClassrooms)
  .post(
    classroomController.createClassroomAddInstructor,
    classroomController.createClassroom
  );

router.post('/:uuid', classroomController.joinClassroom);

router.post('/posts/:postId/comments', classroomController.postComment);

router.delete(
  '/posts/:postId/comments/:commentId',
  classroomController.deleteComment
);

router.post(
  '/:classId/posts',
  classroomController.uploadFilesPost,
  classroomController.postaPost
);

router.post(
  '/posts/:postId/assignmentSubmission',
  classroomController.uploadFileSubmission,
  classroomController.postAssignmentSubmission
);

router.delete('/:classId?/posts/:postId', classroomController.deletePost);

module.exports = router;
