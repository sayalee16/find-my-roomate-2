import connectDB from "./db/connect.js";
import House from "./models/house.js";
import dotenv from "dotenv";


const houses =[
  {
    "owner_id": 1,
    "address": "Flat 101, Marvel Enigma, Kalyani Nagar",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 12000,
    "total_rooms": 3,
    "available_rooms": 1,
    "added_at_date": "2024-12-20T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Male",
    "age_min": 22,
    "age_max": 35,
    "latitude": 18.5520,
    "longitude": 73.9000,
    "image": "image1.jpg",
    "roommate_description": "Two male software engineers who enjoy a peaceful and clean environment.",
    "searching_for": "A responsible and friendly male roommate who values personal space.",
    "headline": "Tech Haven for Male Roommates!"
  },
  {
    "owner_id": 2,
    "address": "B-202, Oberoi Splendor, Kharadi",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 18000,
    "total_rooms": 4,
    "available_rooms": 2,
    "added_at_date": "2024-12-21T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": false,
    "gender_preference": "Female",
    "age_min": 24,
    "age_max": 32,
    "latitude": 18.5510,
    "longitude": 73.9350,
    "image": "image2.jpg",
    "roommate_description": "Two young female professionals who enjoy cooking and exploring the city.",
    "searching_for": "A female roommate who is tidy, friendly, and enjoys occasional socializing.",
    "headline": "Urban Chic for Female Roommates!"
  },
  {
    "owner_id": 3,
    "address": "C-303, Clover Highlands, NIBM Road",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 25000,
    "total_rooms": 2,
    "available_rooms": 1,
    "added_at_date": "2024-12-22T00:00:00.000Z",
    "wifi": true,
    "furnished": false,
    "parking": true,
    "gender_preference": "Male",
    "age_min": 23,
    "age_max": 30,
    "latitude": 18.4570,
    "longitude": 73.8991,
    "image": "image3.jpg",
    "roommate_description": "A male architect who enjoys minimalism and spends most of his time working or reading.",
    "searching_for": "A like-minded male roommate who values simplicity and cleanliness.",
    "headline": "Minimalist Space for Creative Minds!"
  },
  {
    "owner_id": 4,
    "address": "D-502, Amanora Aspire Towers, Hadapsar",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 20000,
    "total_rooms": 3,
    "available_rooms": 1,
    "added_at_date": "2024-12-23T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Female",
    "age_min": 26,
    "age_max": 34,
    "latitude": 18.5187,
    "longitude": 73.9322,
    "image": "image4.jpg",
    "roommate_description": "A female designer who loves art, decor, and hosting small get-togethers.",
    "searching_for": "A female roommate who shares an interest in creativity and living harmoniously.",
    "headline": "Creative Oasis for Female Designers!"
  },
  {
    "owner_id": 5,
    "address": "E-601, Kolte Patil, Wakad",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 15000,
    "total_rooms": 2,
    "available_rooms": 1,
    "added_at_date": "2024-12-24T00:00:00.000Z",
    "wifi": false,
    "furnished": false,
    "parking": false,
    "gender_preference": "Male",
    "age_min": 20,
    "age_max": 28,
    "latitude": 18.5987,
    "longitude": 73.7700,
    "image": "image5.jpg",
    "roommate_description": "A male student pursuing engineering and preparing for competitive exams.",
    "searching_for": "A male student who is respectful and focused on studies.",
    "headline": "Perfect Study Spot for Male Students!"
  },
  {
    "owner_id": 6,
    "address": "F-407, Blue Ridge, Hinjewadi",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 16000,
    "total_rooms": 2,
    "available_rooms": 1,
    "added_at_date": "2024-12-25T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": false,
    "gender_preference": "Female",
    "age_min": 22,
    "age_max": 30,
    "latitude": 18.5950,
    "longitude": 73.7256,
    "image": "image6.jpg",
    "roommate_description": "A young professional working in IT who enjoys a quiet and cozy home environment.",
    "searching_for": "A female roommate who is easy-going and responsible.",
    "headline": "Cozy Nook for Female IT Professionals!"
  },
  {
    "owner_id": 7,
    "address": "G-801, Kalpataru Serenity, Manjri",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 22000,
    "total_rooms": 3,
    "available_rooms": 1,
    "added_at_date": "2024-12-26T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Male",
    "age_min": 25,
    "age_max": 33,
    "latitude": 18.5166,
    "longitude": 73.9851,
    "image": "image7.jpg",
    "roommate_description": "A male entrepreneur who works from home and prefers a peaceful environment.",
    "searching_for": "A male roommate who values professionalism and cleanliness.",
    "headline": "Peaceful Retreat for Male Entrepreneurs!"
  },
  {
    "owner_id": 8,
    "address": "H-1203, Neco SkyPark, Viman Nagar",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 24000,
    "total_rooms": 3,
    "available_rooms": 1,
    "added_at_date": "2024-12-27T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Female",
    "age_min": 27,
    "age_max": 35,
    "latitude": 18.5622,
    "longitude": 73.9171,
    "image": "image8.jpg",
    "roommate_description": "A female corporate professional who enjoys yoga and home-cooked meals.",
    "searching_for": "A female roommate who is independent and values a healthy lifestyle.",
    "headline": "Healthy Living for Female Professionals!"
  },
  {
    "owner_id": 9,
    "address": "I-507, Amanora Park Town, Hadapsar",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 28000,
    "total_rooms": 4,
    "available_rooms": 2,
    "added_at_date": "2024-12-28T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Male",
    "age_min": 24,
    "age_max": 36,
    "latitude": 18.5187,
    "longitude": 73.9322,
    "image": "image9.jpg",
    "roommate_description": "Two male consultants who travel frequently and maintain a high standard of living.",
    "searching_for": "Male roommates who are organized and career-focused.",
    "headline": "Premium Space for Traveling Professionals!"
  },
  {
    "owner_id": 10,
    "address": "J-210, Godrej Serenity, Kharadi",
    "city": "Pune",
    "state": "Maharashtra",
    "rent": 30000,
    "total_rooms": 3,
    "available_rooms": 1,
    "added_at_date": "2024-12-29T00:00:00.000Z",
    "wifi": true,
    "furnished": true,
    "parking": true,
    "gender_preference": "Female",
    "age_min": 26,
    "age_max": 38,
    "latitude": 18.5510,
    "longitude": 73.9350,
    "image": "image10.jpg",
    "roommate_description": "A senior marketing executive who appreciates organized and peaceful living.",
    "searching_for": "A female roommate who shares similar values and respects personal space.",
    "headline": "Elegant Living for Senior Professionals!"
  }
]

;

dotenv.config();

const seedDB = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
      await House.deleteMany(); // Clear existing data
      await House.insertMany(houses); // Insert new data
      // console.log('Database seeded!');
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  seedDB();