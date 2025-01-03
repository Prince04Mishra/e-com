//right
import React, { useEffect, useState } from "react";
import cartService from "../services/cartService";

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await cartService.getCart(userId);
        setCartItems(cart?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userId) fetchCartItems();
    else {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(guestCart);
    }
  }, [userId]);

  const handleRemoveFromCart = async (productId) => {
    try {
      if (userId) {
        const updatedCart = await cartService.removeFromCart(userId, productId);
        setCartItems(updatedCart.items);
      } else {
        const guestCart = cartItems.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("cart", JSON.stringify(guestCart));
        setCartItems(guestCart);
      }
      alert("Product removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart-page p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.product?._id || item.productId}
              className="mb-4 p-4 border rounded-lg"
            >
              <h2>{item.product?.name || "Product Name"}</h2>
              <p>Quantity: {item.quantity}</p>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() =>
                  handleRemoveFromCart(item.product?._id || item.productId)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
