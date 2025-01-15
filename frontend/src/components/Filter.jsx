import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import axios from "axios";
import { useContext } from "react";
import { AuthContext} from "../context/authContext.jsx";
import Map from "./Map.jsx";
const Filter = () => {
  const [filters, setFilters] = useState({
    city: "",
    gender: "any", // Default to "any"
    minPrice: "",
    maxPrice: "",
  });
  const [filteredHouses, setFilteredHouses] = useState([]);
  const { currUser, updateUser } = useContext(AuthContext);
  const _id = currUser._id;
  
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/houses/data`);
        // console.log(res.data);
        setHouses(res.data);
        setFilteredHouses(res.data); // Initially, display all houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };
    fetchHouses();
  }, []);

  // console.log(filteredHouses);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // console.log("Filters applied:", filters);
    // console.log("Available houses:", houses);

    // Convert filter values to lowercase for case-insensitive comparison
    const cityFilter = filters.city ? filters.city.toLowerCase().trim() : "";

    // Filter houses based on search criteria
    const result = houses.filter((house) => {
      const isCityMatch = house.city.toLowerCase().includes(cityFilter);
      const isGenderMatch =
        filters.gender === "any" ||
        house.gender_preference.toLowerCase() === filters.gender.toLowerCase();
      const isPriceMatch =
        (!filters.minPrice || house.rent >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || house.rent <= parseInt(filters.maxPrice));

      return isCityMatch && isGenderMatch && isPriceMatch;
    });

    ("Filtered houses:", result);
    setFilteredHouses(result);
  };

  return (
    <>
      
        <div className="card-filter">
        <div className="filter-form">
          <div className="top">
            <div className="item">
              <label htmlFor="city">Location</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City Location"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bottom">
            <div className="item">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="minPrice">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="min"
                placeholder="Any"
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="maxPrice">Max Price</label>
              <input
                type="number"
                className="min"
                id="maxPrice"
                name="maxPrice"
                placeholder="Any"
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSearch}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="Card" style={{ flex: "0.5" }}>
          {filteredHouses.length > 0 ? (
            filteredHouses.map((house) => (
              <div key={house.id}>
                <Card house={house} />
              </div>
            ))
          ) : (
            <p>No houses found based on your search criteria.</p>
          )}
        </div>
        </div>
        <div className="spacing-div" style={{flex:0.2}}></div>
        <div className="map-filter">
          <Map houses={filteredHouses} />
        </div>
        
    </>
  );
};

export default Filter;
