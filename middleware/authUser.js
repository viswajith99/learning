export const authUser=(req,res,next)=>{
    try {
        const {token}=req.cookies
        if(!token){
            return  res.status(404).json({ success: false, message: 'user not authinticated ' });
        }
        const tokenVerified=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log('tokenverified',tokenVerified);
        

        if(!tokenVerified){
            return  res.status(404).json({ success: false, message: 'user not authinticated ' });



        }
        req.user=tokenVerified
        next();

    } catch (error) {
         console.log('error');
         
    }
}