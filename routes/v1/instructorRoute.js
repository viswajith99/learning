import express from 'express';
import { createInstructor, instructorLogin, instructorProfile, checkInstuctor, instuctorLogout, getInstructorById } from '../../controller/instructorController.js';
import { authInstructor } from '../../middleware/authInstructor.js';



const router = express.Router();

router.post('/create', createInstructor);
router.get('/instructorlist/:id',getInstructorById)
router.post('/login', instructorLogin);
router.get('/profile/:id', authInstructor, instructorProfile);
router.get('/checkinstructor', authInstructor, checkInstuctor);
router.post('/logout', instuctorLogout);

export default router;