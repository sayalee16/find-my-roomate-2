import SearchBar from "./SearchBar";

const Hero = () => {
    return(
        <>
        <div className="Hero">

            <div className="search">
                <span>Effortlessly find your perfect roommate with our trusted and reliable platform. Simplify your search and create a harmonious living space with ease!</span>
                <span className="span2">Discover the perfect living companion effortlessly with our seamless and reliable roommate matching service. Let us simplify your search, so you can focus on creating a comfortable and harmonious living environment. Find your ideal roommate with ease through our trusted platform.</span>
               <SearchBar/>
            </div>
        
            <img src="friends.png" alt="friends" />
        
        </div>
        
        </>
    )
}
export default Hero;