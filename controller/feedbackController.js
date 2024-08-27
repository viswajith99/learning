

import { Feedback } from "../models/feedbackModel.js";


// Create a new feedback
export const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedbackeedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all feedback for a course
export const getFeedbackByCourse = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ course: req.params.courseId });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update feedback
export const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.feedbackId, req.body, { new: true });
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
