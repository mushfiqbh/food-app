import React from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/listorders");

    if (response.data.success) {
      setData(response.data.data);
    } else {
      toast.error("Error Occured");
    }
  };

  const handleStatus = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders add">
      <h3>Order Page</h3>
      <div className="order-list">
        {data.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <ul className="order-item-food">
                  {order.items.map((item, index) => {
                    return <li>{item.name + "X " + item.quantity}</li>;
                  })}
                </ul>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
              </div>
              
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(event) => handleStatus(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
