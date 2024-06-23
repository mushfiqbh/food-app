import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import React, { useContext, useState } from "react";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("Top dishes near you");
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setSearchMessage("Top dishes near you")
      setFiltered([]);
      return;
    } else {
      const filtered = foodList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filtered.length === 0) {
        setSearchMessage(`No Match Found for ${value}`);
        setFiltered([]);
      } else {
        setSearchMessage(`Search Results for ${value} ${filtered.length}`);
        setFiltered(filtered);
      }
    }
  };

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-topbar">
        <h2>{searchMessage}</h2>
        <div className="food-display-filter">
          <form id="search-form">
            <input
              type="search"
              name="query"
              value={query}
              onChange={handleSearch}
              placeholder="Type Food Name"
            />
          </form>
        </div>
      </div>
      <div className="food-display-list">
        {filtered.length
          ? filtered.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  desc={item.desc}
                  image={item.image}
                  rating={item.rating}
                />
              );
            })
          : foodList.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.desc}
                    image={item.image}
                    rating={item.rating}
                  />
                );
              }
            })}
      </div>
    </div>
  );
};

export default FoodDisplay;
