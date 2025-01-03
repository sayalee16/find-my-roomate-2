import { useNavigate } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/authContext";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [savedPosts, setSavedPosts] = useState([]);
  const { currUser, updateUser } = useContext(AuthContext);
  console.log("curr user from profile page",currUser._id);
  if (!currUser) {
    return <Redirect to="/login" />;
  }
  const handleLogOut = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/logout");
      localStorage.removeItem("user");
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
          `http://localhost:8800/api/post/${currUser._id}`,
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

  const handleOnDelete = async(houseId) => {
    const token = localStorage.getItem("token");
      try {
        const res = await axios.delete(
          `http://localhost:8800/api/post/${currUser._id}`,
         { data: { postId: houseId },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Include cookies
        }
        );
        console.log("Post deleted successfully:", res.data);
        setSavedPosts(res.data.savedPosts);
        updateUser(currUser);
        console.log(res.data.savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
  }

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
        <div class="col-md-5">
          <div
            class="h-80 p-2 rounded-3"
            style={{ backgroundColor: "#7371fc" }}
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
          <h2 style={{ marginTop: " 30px" }}>My List</h2>
          <div className="list" style={{ marginTop: "20px" }}>
            {savedPosts.map((house) => (
              <div key={house.owner_id}>
                <div class="card">
                  <img src="image1.jpg" class="card-img-top" alt="images" />
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
                        handleOnDelete(house._id);
                      }}
                      class="btn btn-primary"
                      style={{ marginLeft: "10px" }}
                    >
                      <i class="fa-solid fa-marker"></i>Delete</a>
                    
                  </div>
                </div>
                <div className="spacer" style={{ height: "35px" }}></div>
              </div>
            ))}
          </div>
        </div>

        <div class="col-md-5">
          <div class="p-3 bg-body-tertiary border rounded-3">
            <h2>Chat box</h2>
            <p>
              Or, keep it light and add a border for some added definition to
              the boundaries of your content. Be sure to look under the hood at
              the source HTML here as we've adjusted the alignment and sizing of
              both column's content for equal-height.
            </p>
            <button class="btn btn-outline-secondary" type="button">
              Example button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
