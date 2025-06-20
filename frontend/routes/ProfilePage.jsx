import { useNavigate } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/authContext";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [savedPosts, setSavedPosts] = useState([]);
  const { currUser, updateUser } = useContext(AuthContext);
  // console.log("curr user from profile page", currUser._id);
  if (!currUser) {
    return <Redirect to="/login" />;
  }
  const handleLogOut = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/logout`);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate("/profile/update-info");
  };

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/post/${currUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setSavedPosts(res.data.savedPosts);
        console.log(res.data.savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };
    fetchSavedPosts();
  }, [currUser._id]);

  const handleOnDelete = async (houseId) => {
    const token = localStorage.getItem("token");
    // console.log("token from handle delete",token);
    // console.log("houseid: ",houseId);
    // console.log("curr user id: ", currUser._id);
    // all correct above
    
    try {
      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/post`,
        {
    data: { postId: houseId,
      userId: currUser._id
     },
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  }
      );
      // console.log("Post deleted successfully:", res.data);
      updateUser(currUser);
      localStorage.setItem("user", JSON.stringify(currUser));
      localStorage.setItem("token", token);
      setSavedPosts(res.data.savedPosts);
      // console.log(res.data.savedPosts);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };

  return (
    <>
      <div
        className="row align-items-md-stretch"
        style={{
          padding: "50px",
          backgroundColor: "#F3F4F6",
          justifyContent: "space-around",
        }}
      >
        <div class="col-md-5" className="profile">
        <div className="list" style={{ flex: 1.2}}>
            <h2>My List</h2>
            {savedPosts.map((house) => (
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
                          <i
                            class="fa-solid fa-house"
                            style={{ margin: "5px" }}
                          ></i>
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
                    <a href={`/${house.owner_id}`} class="btn btn-primary">
                      View More
                    </a>

                    <a
                      href={`/${house.owner_id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnDelete(house.postId);
                      }}
                      class="btn btn-primary"
                      style={{ marginLeft: "10px" }}
                    >
                      <i class="fa-solid fa-marker"></i>Delete
                    </a>
                  </div>
                </div>
                <div className="spacer" style={{ height: "35px" }}></div>
              </div>
            ))}
          </div>
         

          <div className="spacing-div" style={{flex: 0.3}}></div>

          <div
            class="h-80 p-3 rounded-3"
            style={{ backgroundColor: "#7371fc", flex: 1 }}
          >
            <h2>User Information</h2>
            <p>Username: {currUser.username}</p>
            <p>Email: {currUser.email}</p>
            <button
              class="btn btn-outline-dark"
              type="button"
              onClick={handleUpdate}
            >
              Update Profile
            </button>
            <button
              class="btn btn-dark"
              style={{ marginLeft: "15px" }}
              type="button"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default ProfilePage;
