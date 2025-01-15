import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
        // console.log("Token from cookies: ", token); 
        if(!token) {
            return res.status(401).json({msg: "not authenticated"})
        }
    
        jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {
            if(err){
                console.error("JWT verification failed:", err); 
                return res.status(403).json({msg: "token not valid",error: err.message})
            }

            req.userId = payload.userId;
            
            next();
        })
}