import mongoose from "mongoose";
var HouseSchema = new mongoose.Schema({
  owner_id: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  rent: { type: Number, required: true },
  total_rooms: { type: Number, required: true },
  available_rooms: { type: Number, required: true },
  added_at_date: { type: Date, required: true },
  wifi: { type: Boolean, required: true },
  furnished: { type: Boolean, required: true },
  parking: { type: Boolean, required: true },
  gender_preference: {
    type: String,
    enum: ["Male", "Female", "Any"],
    required: true,
  },
  age_min: { type: Number, required: true },
  age_max: { type: Number, required: true },
  latitude: {type: Number, required : true},
  longitude: {type: Number, required : true},
  image: { type: String, required: true },
  roommate_description: {
    type: String,
    required: false,
    default: "No description provided.",
    maxlength: 500
  },
  searching_for: {
    type: String,
    required: false,
    default: "Looking for a compatible roommate.",
    maxlength: 500,
  },
  headline : {
    type: String,
    default: "Looking for a compatible roommate.",
    maxlength: 500
  }
});

export default mongoose.model("House", HouseSchema);
