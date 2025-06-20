import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
export const register = async (req,res) => {
    const {username, email, contactno, password, isAdmin} = req.body;
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Raw password:", password);
console.log("Hashed password:", hashPassword);
    // console.log(hashPassword);
    //create new user n save to db
      try {
        var user = await User.create({ username, email,contactno,password: hashPassword ,isAdmin});

        res.status(201).json({ user });
      } catch (error) {
        res.status(500).json({ msg: "failed to create user" });
      }
    
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("BODY RECEIVED:", req.body); 

    try {
        // Check if user exists in the DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        console.log("Entered password:", password);
        console.log("Stored hash:", user.password);

        //Compare passwords
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        console.log("Password match:", isMatch);    
        
        if (!isMatch) {
           return res.status(400).json({ msg: "Invalid credentials" });
        }
        

        // Generate JWT token
        const token = jwt.sign({ username: user.username,isAdmin: user.isAdmin , userId: user._id   }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        // Send token to the client
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000)
        });

        // console.log("user is");
        // console.log(user);
        // Send the JSON response
        return res.status(200).json({ msg: "Login successful", token ,user: user});

    } catch (error) {
        res.status(500).json({ msg: "Error during login", error: error.message });
    }

}

export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({msg: "logout successful"})
}