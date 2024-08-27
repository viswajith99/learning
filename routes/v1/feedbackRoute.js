import express from 'express';
import { createFeedback, deleteFeedback, getFeedbackByCourse, getFeedbackById, updateFeedback } from '../../controller/feedbackController.js';



const router = express.Router();

// Create new feedback
router.post('/create', createFeedback);

// Get all feedback for a specific course
router.get('/course/:courseId', getFeedbackByCourse);

// Get feedback by ID
router.get('/feedback/:feedbackId', getFeedbackById);

// Update feedback by ID
router.put('/feedback/:feedbackId', updateFeedback);

// Delete feedback by ID
router.delete('/feedback/:feedbackId', deleteFeedback);

export default router;
