import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const url = import.meta.env.VITE_SERVER_URL;
  console.log(url);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId, del = false) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: del ? 0 : prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      await fetchFoodList();
    };

    loadData();
  }, []);

  useEffect(() => {
    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = foodList.find((product) => product._id === item);
          totalAmount += itemInfo?.price * cartItems[item];
        }
      }
      return totalAmount;
    };

    setCartAmount(getTotalCartAmount());
  }, [cartItems, foodList]);

  const contextValue = {
    url,
    token,
    setToken,
    foodList,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartAmount,
    setCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
