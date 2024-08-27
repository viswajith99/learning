import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }],
        marks: {
            type: Number,
            required: true
        }
    }],
    maxMarks: {
        type: Number,
        required: true
    },
    quizDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true 
});

export const Quiz = mongoose.model('Quiz', quizSchema);
