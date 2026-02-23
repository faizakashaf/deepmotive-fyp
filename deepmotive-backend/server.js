//server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import MongoDB connection
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habits");
const challengeRoutes = require("./routes/challenges");
const journalRoutes = require("./routes/journal");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "DeepMotive Server is running",
    database: "MongoDB",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/journal", journalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "Something went wrong!",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Database: MongoDB Atlas`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
