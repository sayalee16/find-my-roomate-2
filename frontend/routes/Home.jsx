import { useContext } from "react";
import Hero from "../src/components/Hero"
import { AuthContext } from "../src/context/authContext";

const Home = () => {
    const {currUser} = useContext(AuthContext);
    console.log("current user is :");
    console.log(currUser);
    return (
        <>
        <Hero/>
        </>
    )
}

export default Home;