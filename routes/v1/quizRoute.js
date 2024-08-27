import express from 'express';

import { authInstructor } from '../../middleware/authInstructor.js';
import { createQuiz, deleteQuiz, getQuizById, getQuizzesByCourse, updateQuiz } from '../../controller/quizController.js';

const router = express.Router();

// Route to create a new quiz
router.post('/create',authInstructor, createQuiz);

// Route to get all quizzes for a specific course
router.get('/course/:courseId', getQuizzesByCourse);

// Route to get a single quiz by its ID
router.get('/:quizId', getQuizById);

// Route to update a quiz by its ID
router.put('/:quizId', updateQuiz);

// Route to delete a quiz by its ID
router.delete('/:quizId', deleteQuiz);

export default router;
