import Card from "./Card.jsx";
const Filter = () => {
  return (
    <>
      <div className="filter">
        <div className="filter-form">
          <div className="top">
            <div className="item">
              <label htmlFor="city">Location</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City Location"
              />
            </div>
          </div>
          <div className="bottom">
            <div className="item">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="minPrice">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Any"
              />
            </div>
            <div className="item">
              <label htmlFor="maxPrice">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Any"
              />
            </div>
            <button>
          <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          </div>
        </div>
        <div className="Card" style={{ flex: "0.5" }}>
          <Card></Card>
        </div>
      </div>
    </>
  );
};

export default Filter;
