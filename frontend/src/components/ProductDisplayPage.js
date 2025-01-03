import React, { useEffect, useState } from "react";
import cartService from "../services/cartService";
import { getProducts } from "../services/productService";

const ProductDisplayPage = ({ userId }) => {
  console.log("userId:", userId);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // const handleAddToCart = async (productId) => {
  //   try {
  //     if (userId) {
  //       const updatedCart = await cartService.addToCart(userId, productId, 1);
  //       alert("Product added to cart!");
  //     } else {
  //       const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
  //       const existingItem = guestCart.find(
  //         (item) => item.productId === productId
  //       );

  //       if (existingItem) {
  //         existingItem.quantity += 1;
  //       } else {
  //         guestCart.push({ productId, quantity: 1 });
  //       }

  //       localStorage.setItem("cart", JSON.stringify(guestCart));
  //       alert("Product added to cart!");
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  const handleAddToCart = async (productId) => {
    try {
      if (userId) {
        const updatedCart = await cartService.addToCart(userId, productId, 1);
        alert("Product added to cart!");
      } else {
        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = guestCart.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          guestCart.push({ productId, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(guestCart));
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="product-display-page m-auto">
      <h1 className="text-2xl font-bold my-2 px-5">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-xl">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p>{product.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplayPage;
