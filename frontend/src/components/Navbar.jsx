import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Navbar = () => {
    const { currUser } = useContext(AuthContext);
    // console.log(currUser);
    return (
        <nav>
            <Link to="/" className="home">
                <i className="fa-solid fa-house home"></i>
                <span>Find My Roommate</span>
            </Link>

            {currUser ? (
                <>
                    <Link to="/home" className="Home">Home</Link>
                    <Link to="/about" className="About">About</Link>
                    <Link to="/list" className="List">List</Link>
                    <Link to="/profile" className="Profile">Profile</Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="Signin">Sign in</Link>
                    <Link to="/register" className="Logout">Sign Up</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
