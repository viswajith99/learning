import mongoose from "mongoose";
export const connect_DB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected sucessfully');
        
        
    } catch (error) {
        console.log('error');
        
        
    }
}
