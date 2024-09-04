import express from 'express';
import { createAssignment, deleteAssignment, getAssignmentById, getAssignmentsByCourse, submitAssignment, updateAssignment } from '../../controller/assignmentController.js';
import { authInstructor } from '../../middleware/authInstructor.js';
import { upload } from '../../middleware/uploadMiddleware.js';


const router = express.Router();


router.post('/create',authInstructor, upload.single('file'), createAssignment);
router.post('submit',submitAssignment)


router.get('/courses/:courseId/assignments', getAssignmentsByCourse);

router.get('/:assignmentId', getAssignmentById);

router.put('/:assignmentId', updateAssignment);

// Route to delete a specific assignment by its ID
router.delete('/assignments/:assignmentId', deleteAssignment);

export default router;
