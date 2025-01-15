import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async(req,res) => {
    // console.log(req.userId);
    res.status(200).json({msg: "you are authenticated"})
}

export const shouldBeAdmin = async(req,res) => {
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
        if(!payload.isAdmin){
            return res.status(403).json({msg: "not authorized"})
        }
        res.status(200).json({msg: "you are authenticated", payload })
    })
}