import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import "./Search.css"

const SearchBar = () => {
  const { foodList } = useContext(StoreContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchMessage, setSearchMessage] = useState("Your Search Results");

  // const SearchBar = ( handleSearch ) => {
  //   const [searchQuery, setSearchQuery] = useState("");

  //   const handleChange = (event) => {
  //     setSearchQuery(event.target.value);
  //     handleSearch(event.target.value); // Pass the search query to the parent component
  //   };

  //   return (
  //     <input
  //       type="text"
  //       placeholder="Search by item name..."
  //       value={searchQuery}
  //       onChange={handleChange}
  //     />
  //   );
  // };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = document.forms["search-form"].elements.query.value;
    if (query) {
      const filtered = foodList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length == 0) {
        setSearchMessage(`No Match Found for ${query}`);
        setFilteredItems([]);
      } else {
        setSearchMessage(`Search Results for ${query}`);
        setFilteredItems(filtered);
      }
    }
  };

  return (
    <div>
      <br />
      <form name="search-form" onSubmit={handleSearch}>
        <input type="search" name="query" placeholder="Type Food Name" />
        <button type="submit">Find</button>
      </form>

      <br />
      <div className="food-display" id="food-display">
        <h2>{searchMessage}</h2>
        <div className="food-display-list">
          {filteredItems.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              desc={item.description}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
