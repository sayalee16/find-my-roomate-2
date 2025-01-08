import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Map = ({houses}) => {
  // const [houses, setHouses] = useState([]);
  // useEffect(() => {
  //   const fetchHouses = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/api/houses/data");
  //       console.log(res.data);
  //       setHouses(res.data); // Update state with the fetched houses
  //     } catch (error) {
  //       console.error("Error fetching houses:", error);
  //     }
  //   };
  //   fetchHouses();
  // }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[18.5204, 73.8567]}  // Center on Maharashtra
        zoom={11} // Adjust zoom level for Maharashtra
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {houses.map((house) => (
          <Marker position={[house.latitude, house.longitude]}>
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
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
