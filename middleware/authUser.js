import jwt from 'jsonwebtoken'
export const authUser=(req,res,next)=>{
    try {
        const {user_token}=req.cookies
        if(!user_token){
            return  res.status(404).json({ success: false, message: 'user not authinticated ' });
        }
        const tokenVerified=jwt.verify(user_token,process.env.JWT_SECRET_KEY)
        console.log('tokenverified',tokenVerified);
        

        if(!tokenVerified){
            return  res.status(404).json({ success: false, message: 'user not authinticated ' });



        }
        req.user=tokenVerified
        next();

    } catch (error) {
         console.log(error);
         
    }
}