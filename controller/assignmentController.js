import { cloudinaryInstance } from "../config/cloudinary.js";
import { Assignment } from "../Models/AssignmentModel.js";

export const createAssignment = async (req, res) => {
    try {
        const { title, description, course, dueDate, maxMarks } = req.body;

        // Validate all required fields
        if (!title || !description || !course || !dueDate || !maxMarks) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check for file upload
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Log the uploaded file information for debugging
        console.log('Uploaded file:', req.file);

        // Upload the file to Cloudinary
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ success: false, message: 'File upload failed' });
        });

        if (!uploadResult || !uploadResult.url) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }

        // Create new assignment instance
        const assignment = new Assignment({
            title,
            description,
            course:course._id,
            dueDate,
            maxMarks,
            fileLink: uploadResult.url // Store the Cloudinary URL
        });

        // Log request body for debugging
        console.log("Request Body:", req.body);

        // Save the assignment to the database
        await assignment.save();

        // Respond with success message and assignment data
        res.status(201).json({ success: true, message: 'Assignment created successfully', data: assignment });

    } catch (error) {
        // Log error and respond with failure message
        console.log("Error:", error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
};


export const submitAssignment = async (req, res) => {
    try {
        const { userId } = req.body;
        const { assignmentId } = req.params;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Log the uploaded file information
        console.log('Uploaded file:', req.file);

        // Upload the file to Cloudinary
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ success: false, message: 'File upload failed' });
        });

        if (!uploadResult || !uploadResult.url) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        // Add the submission with the Cloudinary URL
        assignment.submissions.push({
            user: userId,
            fileLink: uploadResult.url, // Use the URL from Cloudinary
            submissionDate: Date.now(),
            marksObtained: null, // To be evaluated later
        });

        await assignment.save();

        res.status(201).json({ success: true, message: 'Assignment submitted successfully', data: assignment });
    } catch (error) {
        console.error('Submit assignment error:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
};



export const getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignmentsignment.find({ course: req.params.courseId });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.assignmentId, req.body, { new: true });
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
