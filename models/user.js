import mongoose from "mongoose";
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    trim: true,
  }  ,
  contactno: {
    type: Number,
    maxlength:[10,"contact no cant be grater than 10 digits"]
  },
  password: {
    type:String,
    require:true,
    trim:true,
  },
  isAdmin: {
    type:Boolean,
    default:false
  },
  savedPosts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House", // Reference to the existing House model
    }],  
});
export default mongoose.model("User", UserSchema);