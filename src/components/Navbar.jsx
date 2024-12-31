const Navbar = () => {
    return (
        <>
        <nav>
        
            <a href="/" className="home">
            <i className="fa-solid fa-house home"></i>
            <span>Find My Roomate</span>
            </a>
            <a href="/home" className="Home">Home</a>
            <a href="/home" className="About">About</a>
            <a href="/list" className="Contacts">List</a>
            <a href="/profile" className="Agents">Profile</a>
            <a href="/login" className="Signin">Sign in</a>
            <a href="/register" className="Signup">Sign up</a>
       
        </nav>
        
        </>
    )
}

export default Navbar;