import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import { cloudinaryInstance } from '../config/cloudinary.js';
import { generateToken } from '../utils/generateToken.js';


// Fetch user list
export const getUserList = async (req, res, next) => {
    try {
        const userList = await User.find();
        res.json({ success: true, message: 'Fetched user list', data: userList });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Create a new user
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, mobile } = req.body;

        if (!name || !email || !password || !confirmPassword || !mobile) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        console.log('profilepic].......', req.file);
  
    
        if (!req.file) {
          return res.status(400).json({ message: 'Image not visible' });
        }
    
     
        const uploadProfile = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
          console.log(error);
          return res.status(500).json({ message: 'Image upload failed' });
        });
    
        console.log(uploadProfile);
    

        const saltRounds = 10;
        const hashpassword = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({ name, email, password: hashpassword, mobile });
        if (uploadProfile?.url) {
            newUser.profile = uploadProfile.url;
          }
        await newUser.save();

        const token = generateToken(email);
        res.cookie('token', token);
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const {  name, email, mobile, profilepic } = req.body;
        const {id}=req.params

      
        const user = await User.findById(id,{  name, email, mobile, profilepic },{new:value});
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await user.save();

        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};




export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: 'User does not exist' });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(email);
        res.cookie('token', token);
        res.json({ success: true, message: 'User logged in successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const userProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = await User.findById(id).select("-password");
        res.json({ success: true, message: 'User profile fetched', data: userData });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};

export const checkUser = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User fetched', data: user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};
export const userLogout = async (req, res, next) => {
    try {
       
        res.clearCookie('token');
        res.json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};
