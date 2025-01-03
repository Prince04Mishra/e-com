import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(response.data);
    } catch (error) {
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update product
        await axios.put(
          `http://localhost:5000/api/products/${editingProductId}`,
          product,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Product updated successfully");
      } else {
        // Add new product
        await axios.post("http://localhost:5000/api/products", product, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Product added successfully");
      }
      setProduct({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
      setIsEditing(false);
      setEditingProductId(null);
      fetchProducts(); // Refresh product list
    } catch (error) {
      alert("Error saving product");
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setProduct(product); // Populate the form with product details
    setIsEditing(true);
    setEditingProductId(product._id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Product Management</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Product Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Price</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Category</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Stock</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Image URL</label>
          <input
            type="url"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="https://example.com/image.jpg"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      <h2 className="text-xl font-bold mt-8">Products List</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Price</th>
              <th className="p-2 border border-gray-300">Category</th>
              <th className="p-2 border border-gray-300">Stock</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="p-2 border border-gray-300">{product.name}</td>
                <td className="p-2 border border-gray-300">₹{product.price}</td>
                <td className="p-2 border border-gray-300">
                  {product.category}
                </td>
                <td className="p-2 border border-gray-300">{product.stock}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
