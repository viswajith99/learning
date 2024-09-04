import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { Instructor } from '../models/instructorModel.js';

// Admin Login
export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const admin = await Instructor.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin does not exist' });
        }

        const passwordMatch = bcrypt.compareSync(password, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken({ email}, 'admin' );
        res.cookie('admin_token', token);

        res.json({ success: true, message: 'Admin logged in successfully' });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Admin Logout
export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie('admin_token');
        res.json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};





// export const getInstructorList = async (req, res, next) => {
//     try {
       
//         const listofInstructor=await Instructor.find();
        
        
//             res.json({sucess:true,message:' fetched courselist',data:listofInstructor});
    
//         }
    
//          catch (error) {
//             res.status(error.status ||500).json({message:error.message ||'internal server error'});
            
    
//         }
//     }





export const deleteInstructor = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the instructor ID from the request parameters

        const deletedInstructor = await Instructor.findByIdAndDelete(id); // Find and delete the instructor

        if (!deletedInstructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        res.clearCookie('admin_token');
        res.json({ success: true, message: 'Instructor deleted successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


