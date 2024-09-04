import { Cart } from "../models/cartModel.js";
import { Course } from "../models/courseModel.js";

export const addCourseToCart = async (req, res) => {
    try {
        const { userId, courseId, quantity } = req.body;

        // Validate the input
        if (!userId || !courseId) {
            return res.status(400).json({ success: false, message: 'User ID and Course ID are required' });
        }

        // Check if the course exists
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, courses: [] });
        }

        // Check if the course is already in the cart
        const courseIndex = cart.courses.findIndex(c => c.course.toString() === courseId);
        if (courseIndex > -1) {
            // Update quantity if course is already in cart
            cart.courses[courseIndex].quantity += quantity || 1;
        } else {
            // Add new course to cart
            cart.courses.push({ course: courseId, quantity: quantity || 1 });
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ success: true, message: 'Course added to cart', data: cart });

    } catch (error) {
        console.error('Error adding course to cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get the cart for a user
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId }).populate('courses.course');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, data: cart });

    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
