import express from "express";
import userRoute from './userRoute.js';
import courseRoute from './courseRoute.js';
import instructorRoute from './instructorRoute.js';
import adminRoute from './adminRoute.js';
import assignmentRoute from  './assignmentRoute.js';
import feedbackRoute from  './feedbackRoute.js';
import quizRoute  from './quizRoute.js';
import cartRoute from './cartRoute.js';
const v1Router = express.Router()
v1Router.use('/user', userRoute)
v1Router.use('/course', courseRoute)
v1Router.use('/instructor', instructorRoute)
v1Router.use('/admin',adminRoute)
v1Router.use('/assignment',assignmentRoute)
v1Router.use('/feedback',feedbackRoute)
v1Router.use('/quiz',quizRoute)
v1Router.use('/cart',cartRoute)

export default v1Router