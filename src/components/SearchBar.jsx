import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from "./Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import House from "../../models/house.js";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
const SearchBar = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: "",
    gender: "any", // Default to "any"
    minPrice: "",
    maxPrice: "",
  });
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/houses/data");
        console.log(res.data);
        setHouses(res.data);
        setFilteredHouses(res.data); // Initially, display all houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };
    fetchHouses();
  }, []);
  const { currUser, updateUser } = useContext(AuthContext);
  const _id = currUser._id;
  console.log("user from home", currUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(filters);
  };

  const queryParams = new URLSearchParams(filters).toString();

  return (
    <>
      <div className="searchBar">
        <div className="type"></div>
        <form>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            placeholder="City Location"
          />
          <input
            type="number"
            name="minPrice"
            min={0}
            max={1000000}
            placeholder="Min Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            min={0}
            max={1000000}
            onChange={handleChange}
            placeholder="Max Price"
          />
          <Link to={`/search-results?${queryParams}`}>
          <button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
