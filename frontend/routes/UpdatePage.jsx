import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../src/context/authContext";
import { useContext, useState } from "react";
const UpdatePage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currUser, updateUser } = useContext(AuthContext);
  const _id = currUser._id;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const contactno = formData.get("contactno");

    const token = localStorage.getItem("token");
    // console.log("Token from localStorage:", token);
  
    try {
      const res = await axios.put(
        `http://localhost:8800/api/user/${_id}`,
        { username, email, contactno, password },
        {
            headers: { Authorization: `Bearer ${token}` }, // Add token to headers
            withCredentials: true, // Include cookies
          }
        
      );
      updateUser(res.data.user); // Update user context with the updated user details
      console.log(res.data);
  
      navigate("/profile"); // Redirect to the profile page after successful update
    } catch (error) {
      console.error("Error updating user:", error.response?.data?.msg || error.message);
      setError(error.response?.data?.msg || "Failed to update user");
    }
  };
  return (
    <>
      <div className="register">
        <form className="formContainer" onSubmit={handleOnSubmit}>
          <h2 className="formTitle">Update Information</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              defaultValue={currUser.username}
              name="username"
              placeholder="Username"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              defaultValue={currUser.email}
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              defaultValue={currUser.contactno}
              className="form-control"
              id="contactno"
              name="contactno"
              placeholder="Contact Info"
              required
            />
            <label htmlFor="contactno">Contact Information</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              marginTop: "16px",
              width: "100%",
              height: "50px",
              backgroundColor: "#7371fc",
              borderColor: "#7371fc",
            }}
          >
            Update
          </button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </>
  );
};

export default UpdatePage;
