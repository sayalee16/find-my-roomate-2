import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../src/components/Card";
import Map from "../src/components/Map";
const SearchResults = () => {
    const [filters, setFilters] = useState({
        city: "",
        gender: "any", // Default to "any"
        minPrice: "",
        maxPrice: "",
      });
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [oghouses,setOghouses] = useState([]);
  const location = useLocation();
  const [houses, setHouses] = useState([]);
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city") || "pune";
  const minPrice = queryParams.get("minPrice") || 0;
  const maxPrice = queryParams.get("maxPrice") || Infinity;

  useEffect(() => {
    // Fetch data based on query params
    const fetchHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/houses/data");
        setOghouses(res.data);
        const filtered = res.data.filter((house) => {
          return (
            house.city.toLowerCase().includes(city.toLowerCase()) &&
            house.rent >= minPrice &&
            house.rent <= maxPrice
          );
        });
        setHouses(filtered);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, [city, minPrice, maxPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {

    console.log("oghouses",oghouses);
    // Convert filter values to lowercase for case-insensitive comparison
    const cityFilter = filters.city ? filters.city.toLowerCase().trim() : "";

    // Filter houses based on search criteria
    const result = oghouses.filter((house) => {
      const isCityMatch = house.city.toLowerCase().includes(cityFilter);
      const isGenderMatch =
        filters.gender === "any" ||
        house.gender_preference.toLowerCase() === filters.gender.toLowerCase();
      const isPriceMatch =
        (!filters.minPrice || house.rent >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || house.rent <= parseInt(filters.maxPrice));

      return isCityMatch && isGenderMatch && isPriceMatch;
    });

    console.log("Filtered houses:", result);
    setFilteredHouses(result);
    setHouses(result);
  };
  return (
    <>
      <div className="filter" style={{marginTop:"0px"}}>
        <div className="card-filter">
          <div className="filter-form" style={{marginBottom:"10px"}}>
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
          <h4>Search Results:  </h4>
          <div className="Card" style={{ flex: "0.5" }}>
            {houses.length > 0 ? (
              houses.map((house) => (
                <div key={house.id}>
                  <Card house={house} />
                </div>
              ))
            ) : (
              <p>No houses found based on your search criteria.</p>
            )}
          </div>
        </div>
        <div className="spacing-div" style={{ flex: 0.2 }}></div>
        <div className="map-filter">
          <Map houses={houses} />
        </div>
      </div>
    </>
  );
};
export default SearchResults;
