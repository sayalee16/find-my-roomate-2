import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
    const [houses, setHouses] = useState([]);
    useEffect(() => {
      const fetchHouses = async () => {
        try {
          const res = await axios.get("http://localhost:8800/api/houses/data");
          console.log(res.data);
          setHouses(res.data); // Update state with the fetched houses
        } catch (error) {
          console.error("Error fetching houses:", error);
        }
      };
      fetchHouses();
    }, []);

    return (
        <>
        <div className="page">
            <img src={houses[0].image} alt="" />
        </div>
        </>
    )
}

export default Page;