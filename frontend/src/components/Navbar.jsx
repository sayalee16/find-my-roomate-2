import { Link } from "react-router";

const Navbar = () => {
    return (
        <>
        <nav>
        
            <Link to="/" className="home">
            <i className="fa-solid fa-house home"></i>
            <span>Find My Roomate</span>
            </Link>
            <Link to="/home" className="Home">Home</Link>
            <Link to="/home" className="About">About</Link>
            <Link to="/list" className="List">List</Link>
            <Link to="/profile" className="Profile">Profile</Link>
            <Link to="/login" className="Signin">Sign in</Link>
            <Link to="/register" className="Signup">Sign up</Link>
       
        </nav>
        
        </>
    )
}

export default Navbar;