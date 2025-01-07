import House from "../models/house.js";
import User from "../models/user.js";
import mongoose from "mongoose";
export const addPost = async(req,res) => {
    const _id = req.params.id;    
    const {postId,image,headline,address,rent,available_rooms,searching_for,owner_id } = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }     
        const postIdObject = new mongoose.Types.ObjectId(postId);
        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push({
              postId:postIdObject,
              image,
              headline,
              address,
              rent,
              available_rooms,
              searching_for,
              owner_id
            });
          }
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
    
    const _id = req.params.userId; // Get the user ID from the URL parameters
   const postId = req.params.postId;
//    console.log("User ID:", _id);
//    console.log("Post ID:", postId);
    try {
      // Validate if postId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ msg: "Invalid postId" });
      }
  
      // Find the user by ID
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Find the post inside savedPosts array
      const postIndex = user.savedPosts.findIndex(
        (savedPost) => savedPost.postId.toString() === postId.toString()
      );
  
      if (postIndex !== -1) {
        // Remove the post from savedPosts
        user.savedPosts.splice(postIndex, 1);
        await user.save();
  
        return res.status(200).json({
          msg: "Post deleted successfully",
          savedPosts: user.savedPosts,
        });
      } else {
        return res.status(404).json({ msg: "Post not found in saved posts" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Error while deleting post",
        error: error.message,
      });
    }
  };
  

export const getHouse = async(req, res) => {
  const _id = req.params.id;
  try {
     const house = await House.findById(_id);
     if(!house){
      return res.status(404).json({ msg: "House not found" });
     }
     console.log(house);
     res.status(200).json({ msg: "house displayed", house});  
  } catch (error) {
    res.status(500).json({msg:"error displaying house post"});
    console.log(error);
  }
}