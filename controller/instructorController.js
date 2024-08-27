
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

import { Course } from '../models/courseModel.js';
import { Instructor } from '../models/instructorModel.js';







export const getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.json(instructor);
    } catch (error) {
        console.log('error',error)
        res.status(500).json({ message: error.message });
    }
};


export const createInstructor= async (req, res, next) => {
    try {
        const { name, email, password, courses } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const instructorExist = await Instructor.findOne({ email });

        if (instructorExist) {
            return res.status(404).json({ success: false, message: "Instructor already exist" });
        }

        //hashing
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        //create new user
        const newInstructor = new Instructor({ name, email, password: hashedPassword, role: "instructor", courses });
        await newInstructor.save();

        //create token
        const token = generateToken(email, "instructor");

        res.cookie("token", token);
        res.json({ success: true, message: "Instructor created successfully" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};



export const instructorLogin = async (req, res, next) => {
    try {
        const {  email, password } = req.body
        if (!email || !password  ) {
            return res.status(400).json({ success: true, message: 'require all files' });
            
        }

        const userExist=await Instructor.findOne({email})
        if(!userExist){
            return  res.status(404).json({ success: false, message: 'user does not exist' });
        }

       const passwordMatch= bcrypt.compareSync(password, userExist.password)
       if(!passwordMatch){
        return  res.status(400).json({ success: false, message: 'user does not authincated' });
    }




        const token = generateToken({email})
        res.cookie('token', token)
        res.json({ sucess:true,message:'user login sucessfully'
        })

    } catch (error) {
        res.status(error.status ||500).json({message:error.message ||'internal server error'})
        

    }
}


export const instructorProfile = async (req, res, next) => {
    try {
       
        const {id}=req.params
        const useData= await Instructor.findById(id).select("-password");
        res.json({sucess:true,message:'user fetched',data:useData})

    }

     catch (error) {
        res.status(error.status ||500).json({message:error.message ||'internal server error'})
        

    }
}
export const checkInstuctor = async (req, res, next) => {
    try {
       
       const user=req.User
       if(!user)
        res.json({sucess:true,message:'user fetched',data:useData})

    }

     catch (error) {
        res.status(error.status ||500).json({message:error.message ||'internal server error'})
        

    }
}

export const instuctorLogout = async (req, res, next) => {
    try {
       
        res.clearCookie('token');
        res.json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}


export const instructorUpdate = async (req, res, next) => {
    try {
        const { name, email, password, courses, role } = req.body;
        const { id } = req.params;

        // Validate role if provided
        if (role && !['admin', 'instructor'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        // Find the instructor by ID
        const instructor = await Instructor.findById(id).select("-password -email");
        if (!instructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        // Update fields if provided
        instructor.name = name || instructor.name;
        if (password) instructor.password = bcrypt.hashSync(password, 10);
        instructor.role = role || instructor.role;

        // Update courses if provided
        if (Array.isArray(courses)) {
            const courseIds = await Promise.all(courses.map(async (title) => {
                const course = await Course.findOne({ title });
                if (course) return course._id;
                console.error(`Course with title ${title} not found`);
                return null;
            }));
            instructor.courses = courseIds.filter(id => id);
        }

        // Save the updated instructor
        await instructor.save();

        res.json({ success: true, message: 'Instructor updated successfully', data: instructor });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


