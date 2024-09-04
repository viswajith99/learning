import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: [String],
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    }
});

export const Course = mongoose.model('Course', courseSchema);
