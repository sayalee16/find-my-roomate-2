import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = () => {
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
        {houses.map((house) => (
          <div key={house.owner_id}>
            <div class="card">
              <img src={house.image} class="card-img-top" alt="images" />
              <div class="card-body">
                <h5 class="card-title">{house.headline}</h5>
                <p class="card-text">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      {" "}
                      <i class="fa-solid fa-location-dot" style={{margin: "5px"}}></i> <b>Location:</b> {house.address} 
                    </li>
                    <li class="list-group-item">
                      <i class="fa-solid fa-money-bill" style={{margin: "5px"}}></i><b>Rent:</b> ₹{house.rent} 
                    </li>
                    <li class="list-group-item">
                      <i class="fa-solid fa-house" style={{margin: "5px"}}></i><b>Available Rooms: </b>
                      {house.available_rooms}
                    </li>
                    <li class="list-group-item"><i class="fa-solid fa-magnifying-glass" style={{margin: "5px"}}></i><b>Searching for:  </b>
                      {house.searching_for}
                    </li>
                  </ul>
                </p>
                <a href={`/${house.owner_id}`} class="btn btn-primary">View More</a>
                
                <a href={`/${house.owner_id}`} class="btn btn-primary" style={{marginLeft: "10px"}}><i class="fa-solid fa-marker"></i>Save </a>
                
              </div>
            </div>
            <div className="spacer" style={{ height: "35px" }}></div>
          </div>
        ))}
    </>
  );
};

export default Card;
