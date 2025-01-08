import axios from "axios";
import { Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { house } from "../../controllers/houseController";

const Card = ({house}) => {
  // const { currUser, updateUser } = useContext(AuthContext);
  // const _id = currUser._id;
  // const [error, setError] = useState("");
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

  const handleOnSave = async (
    houseID,
    image,
    headline,
    address,
    rent,
    available_rooms,
    searching_for,
    owner_id
  ) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    try {
      const res = await axios.put(
        `http://localhost:8800/api/post/${_id}`, // URL with user ID
        {
          postId: houseID,
          image: image,
          headline: headline,
          address: address,
          rent: rent,
          available_rooms: available_rooms,
          searching_for: searching_for,
          owner_id: owner_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token to headers
          withCredentials: true, // Include cookies
        }
      );
      localStorage.setItem("user", JSON.stringify(currUser));
      localStorage.setItem("token", JSON.stringify(token));
      updateUser(currUser); // Update user context with the updated user details
      console.log(res.data);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data?.msg || error.message
      );
      setError(error.response?.data?.msg || "Failed to update user");
    }
  };
  return (
    <>
        <div key={house.owner_id}>
          <div class="card">
            <img src={house.image} class="card-img-top" alt="images" />
            <div class="card-body">
              <h5 class="card-title">{house.headline}</h5>
              <p class="card-text">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    {" "}
                    <i
                      class="fa-solid fa-location-dot"
                      style={{ margin: "5px" }}
                    ></i>{" "}
                    <b>Location:</b> {house.address}
                  </li>
                  <li class="list-group-item">
                    <i
                      class="fa-solid fa-money-bill"
                      style={{ margin: "5px" }}
                    ></i>
                    <b>Rent:</b> ₹{house.rent}
                  </li>
                  <li class="list-group-item">
                    <i class="fa-solid fa-house" style={{ margin: "5px" }}></i>
                    <b>Available Rooms: </b>
                    {house.available_rooms}
                  </li>
                  <li class="list-group-item">
                    <i
                      class="fa-solid fa-magnifying-glass"
                      style={{ margin: "5px" }}
                    ></i>
                    <b>Searching for: </b>
                    {house.searching_for}
                  </li>
                </ul>
              </p>
              <Link
                to={`/view-more?postId=${house._id}`}
                className="btn btn-primary"
              >
                View More
              </Link>

              <a
                href={`/${house.owner_id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOnSave(
                    house._id,
                    house.image,
                    house.headline,
                    house.address,
                    house.rent,
                    house.available_rooms,
                    house.searching_for,
                    house.owner_id
                  );
                }}
                class="btn btn-primary"
                style={{ marginLeft: "10px" }}
              >
                <i class="fa-solid fa-marker"></i>Save{" "}
              </a>
            </div>
          </div>
          <div className="spacer" style={{ height: "35px" }}></div>
        </div>
    </>
  );
};

export default Card;
