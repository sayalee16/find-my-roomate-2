import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../src/components/Card";
import { useContext, useEffect } from "react";
import { AuthContext } from "../src/context/authContext";


const ProfilePage = () => {
  const navigate = useNavigate();
  const {currUser, updateUser} = useContext(AuthContext);
  if(!currUser){
    navigate("/login");
  }
  const handleLogOut = async() => {
    try{
      const res = await axios.post("http://localhost:8800/api/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/login");
    }
    catch(error){
      console.log(error);
    }
  }

  const handleUpdate = () => {
    navigate("/profile/update-info");
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
            <button class="btn btn-outline-dark" type="button" onClick={handleUpdate}>
              Update Profile
            </button>
            <button class="btn btn-dark" style={{marginLeft: "15px"}} type="button" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
          <h2 style={{marginTop: " 30px"}}>My List</h2>
          <div className="list" style={{marginTop:"20px" }}>
            <Card/>
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
