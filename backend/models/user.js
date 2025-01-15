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
  },
  contactno: {
    type: Number,
    maxlength: [10, "contact no cant be grater than 10 digits"],
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  savedPosts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "House",
      },
      image: { type: String, required: true },
      headline: { type: String, required: true },
      address: { type: String, required: true },
      rent: { type: Number, required: true },
      available_rooms: { type: Number, required: true },
      searching_for: { type: String, required: true },
      owner_id: { type: Number, required: true },
    },
  ]
});
export default mongoose.model("User", UserSchema);
