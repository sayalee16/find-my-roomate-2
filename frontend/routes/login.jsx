import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useContext } from "react";
import { AuthContext } from "../src/context/authContext";

const Login = () => {
    
    const [error,setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {currUser, updateUser} = useContext(AuthContext);
  
const handleOnSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // Same as withCredentials in axios
        body: JSON.stringify({ email, password })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Login failed");
    }

    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    const user = {
      ...data.user,
      token: data.token
    };

    updateUser(user);
    navigate("/home");

  } catch (error) {
    console.error("Error during login:", error);
    setError(error.message);
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