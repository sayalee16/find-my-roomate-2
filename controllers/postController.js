import User from "../models/user.js";
export const addPost = async(req,res) => {
    const _id = req.params.id;    
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const { postId } = req.body;
        if (user.savedPosts.includes(postId)) {
            return res.status(400).json({ msg: "Post already saved" });
        }

        user.savedPosts.push(postId);
        await user.save();
    
        res.status(200).json({ msg: "Post saved successfully", savedPosts: user.savedPosts });   
        
    } catch (error) {
        res.status(500).json({msg:"error while saving post"});
        console.log(error);
    }
}

export const getPost = async(req,res) => {
    const _id = req.params.id; 
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "user posts", savedPosts: user.savedPosts });   
    } catch (error) {
        res.status(500).json({msg:"error while deleting post"});
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    const _id = req.params.id; // Get the user ID from the URL parameters
    try {
        const user = await User.findById(_id); // Find the user by ID
        if (!user) {
            return res.status(404).json({ msg: "User not found" }); // If user not found, return 404
        }

        const { postId } = req.body; // Get the postId to be deleted from the request body

        // Check if the post exists in savedPosts
        if (user.savedPosts.includes(postId)) {
            // Remove the postId from savedPosts using filter
            user.savedPosts = user.savedPosts.filter(post => post.toString() !== postId.toString());
            await user.save(); // Save the updated user document
            return res.status(200).json({ msg: "Post deleted successfully", savedPosts: user.savedPosts }); // Return the updated savedPosts
        } else {
            return res.status(404).json({ msg: "Post not found in saved posts" }); // If the post is not in savedPosts
        }
    } catch (error) {
        res.status(500).json({ msg: "Error while deleting post", error: error.message }); // Handle server errors
        console.log(error);
    }
};


