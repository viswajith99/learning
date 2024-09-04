import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['instructor', 'admin'],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, {
    timestamps: true 
});

export const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', instructorSchema);

