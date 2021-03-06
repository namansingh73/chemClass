const express = require('express');
const authController = require('../controllers/authController');
const classroomController = require('../controllers/classroomController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/', classroomController.getClassrooms);

router.post(
  '/',
  classroomController.createClassroomAddInstructor,
  classroomController.createClassroom
);

router.get('/assignmentSummary', classroomController.getAssignmentSummary);

router
  .route('/:id')
  .get(classroomController.getSingleClassroom)
  .patch(classroomController.updateClassroom);

router.patch('/:classroomId/archive', classroomController.archiveClassroom);
router.patch('/:classroomId/unarchive', classroomController.unarchiveClassroom);

router.post('/join/:uuid', classroomController.joinClassroom);

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

router
  .route('/posts/:postId/assignmentSubmission')
  .post(
    classroomController.uploadFileSubmission,
    classroomController.postAssignmentSubmission
  )
  .get(classroomController.getAssignmentSubmissions);

router.delete('/:classId?/posts/:postId', classroomController.deletePost);

router.patch(
  '/:classroomId/students/:studentId/disable',
  classroomController.disableStudent
);

router.patch(
  '/:classroomId/students/:studentId/enable',
  classroomController.enableStudent
);

module.exports = router;
