import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useContext } from "react";
import { AuthContext } from "../src/context/authContext";

const Login = () => {
    
    const [error,setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {updateUser} = useContext(AuthContext);

    const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    setIsLoading(true);
    // const formData = new FormData(e.target);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
          "http://localhost:8800/api/auth/login",
          { email, password },
          { withCredentials: true }  // Correctly added here in the config object
      );
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token); // Save the token to local storage
        console.log("Token saved:", token);
      }
      else {
        console.error("No token received");
      }
      const user = {
        ...res.data.user,  // Spread the user object
        token: res.data.token,  // Add the token
    };
      // console.log("Response data:", res.data);
      updateUser(user);
      navigate("/home");
  } catch (error) {
      console.error("Error during login:", error);
      setError(error.response ? error.response.data.msg : "Login failed");
  } finally {
      setIsLoading(false);
  }
    
  };
    return (
        <>
        <div className="login">
        <div className="register">
        <form className="formContainer" onSubmit={handleOnSubmit}>
          <h2 className="formTitle">Welcome back!</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <label htmlFor="username">Email</label>
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
            disabled = {isLoading}
            className="btn btn-primary"
            style={{ marginTop: "16px", width: "100%", height: "50px", backgroundColor:"#7371fc", borderColor:"#7371fc" }}
          >
              {isLoading ? "Loading..." : "Login"}
          </button>
          {error && <span>{error}</span>}
          <Link to="/register" className="loginLink" style={{color:"#7371fc"}}>
            Don't have an account? Sign Up
          </Link>
        </form>
        <img src="friends.png" alt="friends" className="registerImage" />
      </div>
        </div>
        </>
    )
}

export default Login;