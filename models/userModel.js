import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:50
    },
    email: {
        type: String,
        required: true,
        unique:true,
        minlength:5,
        maxlength:30
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    mobile: {
        type: String,
        required: true,
        
    },
   
    profilepic:
    {
        type:String,
        default:'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        require:true
    }

})
export const User=mongoose.model('User',userSchema)
