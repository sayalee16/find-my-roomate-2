import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import house from "../models/house";
const Page = () => {
  const [house, setHouse] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId"); 
  console.log("post id from view more",postId);
  
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/post/view-more/${postId}`);
        console.log(res.data);
        setHouse(res.data.house); // Update state with the fetched houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };
    fetchHouses();
  }, [postId]);
console.log(house.headline);
  return (
    <>
      <div className="page">
        <div className="left">
          <img src="image1.jpg" alt="" style={{borderRadius: "10px"}} />
          <h2 style={{marginTop:"20px", marginBottom: "20px"}}>{house.headline}</h2>
          <div className="border">
          <dl>
            <dt><b>Roomate Info: </b></dt>
            <dd>{house.roommate_description}</dd>
            <dt><b>Searching for:</b></dt>
            <dd>{house.searching_for}</dd>
           
            <dt><b>Address: </b></dt>
            <dd>{house.address}</dd>
          
          </dl> 
          <p><b>Rent: </b>Rs.{house.rent}</p>
          <p><b>Gender: </b>{house.gender_preference}<b> Age: </b>{house.age_min} - {house.age_max}</p>
          <p><b>Total rooms: </b>{house.total_rooms}<b> Available Rooms: </b>{house.available_rooms}</p>
          <p><i class="fa-solid fa-wifi" style={{marginRight: "10px"}}></i><i class="fa-solid fa-check"></i></p>
          
          </div>
          
        </div>
        <div className="right">
          <div className="info border" style={{ marginBottom: "20px" }} >
            <li>The rooms are spacious, well-ventilated, and maintained to provide a comfortable and clean living environment. Each room is cleaned regularly, ensuring a fresh and inviting atmosphere for relaxation.</li>
              <li> The furniture is thoughtfully arranged to maximize space, and the cleanliness extends to all common areas like the kitchen and bathrooms, which are sanitized frequently.</li>
            <li>We prioritize hygiene, ensuring that both private and shared spaces are always neat and organized. Whether you're working, studying, or unwinding, the clean and tidy surroundings create an enjoyable and peaceful living experience.</li>
           
          </div>
          <div style={{ height: "500px", width: "100%" }} className="map-info">
            <MapContainer
              center={[18.5204, 74.1]} // Center on Maharashtra
              zoom={11} // Adjust zoom level for Maharashtra
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[18.5187, 73.9322]}>
                <Popup>
                <div className="popup">
                <img src={house.image} style={{ height: "50px" }} />
                <div className="pop-info" style={{marginLeft: "15px"}}>
                  <b>{house.headline}</b>
                  <p><b>Location:</b>{house.city}</p>
                  <p><b>Rent: </b>Rs.{house.rent}</p>
                </div>
              </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
