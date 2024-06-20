import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "Salad",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(url + "/api/food/add", formData);
    if (response.data.success) {
      setData({
        name: "",
        desc: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.desc}
            name="desc"
            rows="6"
            placeholder="Type Content Here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-product-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={handleChange}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-product-price flex-col">
            <p>Product Price</p>
            <input
              onChange={handleChange}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
