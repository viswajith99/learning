import express from 'express';
import { createAssignment, deleteAssignment, getAssignmentById, getAssignmentsByCourse, submitAssignment, updateAssignment } from '../../controller/assignmentController.js';
// import { authInstructor } from '../../middleware/authInstructor.js';

const router = express.Router();


router.post('/create', createAssignment);
router.post('submit',submitAssignment)


router.get('/courses/:courseId/assignments', getAssignmentsByCourse);

router.get('/:assignmentId', getAssignmentById);

router.put('/:assignmentId', updateAssignment);

// Route to delete a specific assignment by its ID
router.delete('/assignments/:assignmentId', deleteAssignment);

export default router;
