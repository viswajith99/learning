import jwt from 'jsonwebtoken';

export const authAdmin = (req, res, next) => {
    try {
        const { admin_token } = req.cookies;


   
        if (!admin_token) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const tokenVerified = jwt.verify(admin_token, process.env.JWT_SECRET_KEY);
        
    
        if (!tokenVerified || tokenVerified.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access forbidden' });
        }

        req.user = tokenVerified;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
};
