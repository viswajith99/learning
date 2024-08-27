import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    feedbackText: {
        type: String,
        maxlength: 500
    },
    grade: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Feedback = mongoose.model('Feedback', feedbackSchema);
