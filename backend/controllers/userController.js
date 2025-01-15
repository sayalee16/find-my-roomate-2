import User from "../models/user.js";
import bcrypt from "bcrypt";
export const getUser = async (req, res) => {
    const _id = req.params.id
    try {
        // const users = await User.find();
        // res.status(200).json(users); -> used for admin page
        const user = await User.findById(_id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 
            "Failed to get user"
        });
    }
}

export const updateUser = async (req, res) => {
    const _id = req.params.id; // ID from URL params
    const tokenUserId = req.userId; // ID extracted from the token middleware
    const { password, ...inputs } = req.body; // Separate password from other inputs
    
    // console.log("Received token:", req.headers.authorization);
    // Check if the user is authorized
    if (_id !== tokenUserId) {
        return res.status(403).json({ msg: "Not authorized to update this user" });
    }

    try {
        let updatedData = { ...inputs }; // Initialize updated data with other fields

        // If the password is provided, hash it and include in the update
        if (password) {
            const updatedPassword = await bcrypt.hash(password, 10);
            updatedData.password = updatedPassword;
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Failed to update user", error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    const _id = req.params.id;
    if(_id != tokenUserId){
        return res.status(403).json({msg: "not authorized to delete user"});
    }
    try {
        User.findByIdAndDelete(_id)
        .then(() => {
            res.status(200).send(`item with id ${_id} is deleted`)
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 
            "Failed to delete users"
        });
    }
}