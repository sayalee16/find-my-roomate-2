import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
const Login = () => {
    
    const [error,setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate("/home");

    const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try{
        const res = await axios.post("http://localhost:8800/api/auth/login",{
            email,password
        })
        localStorage.setItem("user",JSON.stringify(res.data));
        navigate("/home");
    }
    catch(error){
        setError(error.response.data.message);
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
            style={{ marginTop: "16px", width: "100%", height: "50px" }}
          >
            Login
          </button>
          {error && <span>{error}</span>}
          <Link to="/register" className="loginLink">
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