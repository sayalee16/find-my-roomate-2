# Find My Roomate
Find My Roommate is a full-stack web application designed to help users find and connect with potential roommates. It allows users to view available rooms and find a suitable match based on their preferences and requirements.
## Features
- **User Authentication** : Sign up and login with **JWT**-based authentication.Passwords securely hashed with **bcrypt**.
- **User Profile** : User can update profile and logout.
- **Search Functionality** : Filter house listings by location, price, gender and rent.
- **Map Integration** : Integrated React Leaflet for displaying house listings on an interactive map.
- **Saved Posts** : User can save post for future reference.
- **House Listing** : Browse detailed house listings with rent, available rooms, roomate matching and preference.
- **Secure Storage** : User data is securely stored in a MongoDB database.
- **Responsive** : Fully responsive design, optimized for both mobile and desktop devices.
## Technologies Used
- Frontend: React, CSS, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, bcrypt
- Deployment: Vercel
## Deployed on
[Find My Roommate Project](https://find-my-roomate.vercel.app)
## Installation
1. Clone repository
  ```bash
  git clone https://github.com/sayalee16/find-my-roomate-2.git
  ```
2. Start backend
   ```bash
   cd backend
   npm install
   node app.js
   ```
3. Start frontend
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
