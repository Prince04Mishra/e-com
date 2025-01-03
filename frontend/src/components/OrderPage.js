import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await orderService.getOrders();
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded">
              <h2>Order ID: {order.id}</h2>
              <p>Total Items: {order.items.length}</p>
              <p>Total Price: ${order.totalPrice}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;
