
import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true });

export  const Cart = mongoose.model('Cart', cartSchema);
 
