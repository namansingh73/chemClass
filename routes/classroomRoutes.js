const express = require('express');
const authController = require('./../controllers/authController');
const classroomController = require('../controllers/classroomController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post(
  '/',
  classroomController.createClassroomAddInstructor,
  classroomController.createClassroom
);

router.post('/:uuid', classroomController.joinClassroom);

router.post('/:classId/announcements', classroomController.postAnnouncement);

router.post('/posts/:postId/comments', classroomController.postComment);

router.delete(
  '/posts/:postId/comments/:commentId',
  classroomController.deleteComment
);

module.exports = router;
