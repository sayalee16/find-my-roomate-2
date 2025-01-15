import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
const Register = () => {

    const [error,setError] = useState("");
    const navigate = useNavigate("/login");

    const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const contactno = formData.get("contactno");

    try{
        const res = await axios.post("http://localhost:8800/api/auth/register",{
            username,email,password,contactno
        })
        navigate("/login");
    }
    catch(error){
        setError(error.response.data.message);
    }
    
  };

  return (
    <>
      <div className="register">
        <form className="formContainer" onSubmit={handleOnSubmit}>
          <h2 className="formTitle">Create Account</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
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
            style={{ marginTop: "16px", width: "100%", height: "50px" ,backgroundColor:"#7371fc" }}
          >
            Sign Up
          </button>
          {error && <span>{error}</span>}
          <Link to="/login" className="loginLink" style={{color:"#7371fc"}}>
            Already have an account? Log in
          </Link>
        </form>
        <img src="friends.png" alt="friends" className="registerImage" />
      </div>
    </>
  );
};

export default Register;
