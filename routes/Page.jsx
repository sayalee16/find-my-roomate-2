import axios from "axios";
import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Page = () => {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/houses/data");
        console.log(res.data);
        setHouses(res.data); // Update state with the fetched houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };
    fetchHouses();
  }, []);

  return (
    <>
      <div className="page">
        <div className="left">
          <img src="image1.jpg" alt="" style={{borderRadius: "10px"}} />
          <h2 style={{marginTop:"20px", marginBottom: "20px"}}>headline sdfghj sxdcfvgbhjn sdcfvgbhnj xcfvgbh</h2>
          <div className="border">
          <dl>
            <dt><b>Roomate Info: </b></dt>
            <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. D Corporis!</dd>
            <dt><b>Searching for:</b></dt>
            <dd>Lorem ipsum dolor sit  animi quod. Perspiciatis ipsa explicabo corrupti!</dd>
           
            <dt><b>Address: </b></dt>
            <dd>address city state</dd>
          
          </dl> 
          <p><b>Rent: </b>Rs.8746</p>
          <p><b>Gender: </b> Male <b>Age: </b>22-35</p>
          <p><b>Total rooms: </b>3 <b>Available Rooms: </b>2</p>
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
              center={[18.5204, 73.8567]} // Center on Maharashtra
              zoom={6} // Adjust zoom level for Maharashtra
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[18.5187, 73.9322]}>
                <Popup>
                  <p>helo</p>
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
