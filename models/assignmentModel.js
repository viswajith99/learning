import mongoose from "mongoose";


const assignmentSchema = new mongoose.Schema({
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
    dueDate: {
        type: Date,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        submissionDate: {
            type: Date,
            default: Date.now
        },
        fileLink: {
            type: String,
            required: true
        },
        marksObtained: {
            type: Number,
        }
    }]
}, {
    timestamps: true 
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
