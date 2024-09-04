import express from 'express';
import { adminLogin, adminLogout, deleteInstructor,  } from '../../controller/adminController.js';
import { authAdmin } from '../../middleware/authAdmin.js';


const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.delete('/delete',authAdmin,deleteInstructor)
// router.get('/instructorlist',authAdmin,getInstructorList)

export default router;
