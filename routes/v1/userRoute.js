import express from 'express'
import { checkUser, createUser, getUserList, updateUser, userLogin, userLogout, userProfile } from '../../controller/userController.js';
import { authInstructor } from '../../middleware/authInstructor.js';
import { authAdmin } from '../../middleware/authAdmin.js';
import { authUser } from '../../middleware/authUser.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router=express.Router()

router.post('/signup', upload.single('profile'), createUser);

router.put('/update',authUser,updateUser)
router.get('/userlist',authInstructor,authAdmin,getUserList)
router.post('/login',userLogin)
router.get('/profile/:id',authUser,userProfile)
router.get('/checkuser',authUser,checkUser)
router.post('/logout',userLogout)


export default router 