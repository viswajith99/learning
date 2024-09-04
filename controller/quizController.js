import { Quiz } from '../models/quizModel.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
    try {
        const { title, description, course, questions, maxMarks, quizDate } = req.body;

        // Validate required fields
        if (!title || !description || !course || !questions || !maxMarks || !quizDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new quiz
        const quiz = new Quiz({
            title,
            description,
            course,
            questions,
            maxMarks,
            quizDate
        });

        await quiz.save();
        res.status(201).json(quiz);
      
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all quizzes for a course
export const getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ course: req.params.courseId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a quiz
export const updateQuiz = async (req, res) => {
    try {
        const { title, description, course, questions, maxMarks, quizDate } = req.body;

        // Validate required fields
        if (!title || !description || !course || !questions || !maxMarks || !quizDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const quiz = await Quiz.findByIdAndUpdate(
            req.params.quizId,
            {
                title,
                description,
                course,
                questions,
                maxMarks,
                quizDate
            },
            { new: true }
        );

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
