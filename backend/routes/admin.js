const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Get statistics
router.get("/stats", async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Total users
    const loggedInCount = await User.countDocuments({
      lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
    });
    const productCount = await Product.countDocuments(); // Total products
    const orderCount = await Order.countDocuments({ status: "completed" }); // Completed orders

    res
      .status(200)
      .json({ userCount, loggedInCount, productCount, orderCount });
  } catch (err) {
    console.error("Failed to fetch statistics", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

module.exports = router;
