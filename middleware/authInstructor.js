import jwt from 'jsonwebtoken'
export const authInstructor=(req,res,next)=>{
    try {
        const {Instructor_token}=req.cookies
        if(!Instructor_token){
            return  res.status(401).json({ success: false, message: 'user not authinticated ' });
        }
        const tokenVerified=jwt.verify(Instructor_token,process.env.JWT_SECRET_KEY)
        console.log('tokenverified',tokenVerified);
        

        if(!tokenVerified){
            return  res.status(404).json({ success: false, message: 'user not authinticated ' });
           



        }

        
        if(tokenVerified.role !== "instructor" && tokenVerified.role !=="admin" )
           
            
        {
            return  res.status(403).json({ success: false, message: 'Access Denied ' });
         
        }
        req.user=tokenVerified

        next();

    } catch (error) {
         console.log(error);
         
    }
}