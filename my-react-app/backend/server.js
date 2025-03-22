const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

const connectDB = require("./config/db"); // Import MongoDB connection
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");

dotenv.config();
const app = express();

// Connect to MongoDB (WC database)
connectDB();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔹 Weather API Route
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing Weather API Key" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});
app.get("/api/users/history", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.periodHistory || user.periodHistory.length === 0) {
            return res.status(404).json({ message: "No period history found" });
        }

        res.json(user.periodHistory);
    } catch (err) {
        console.error("Error fetching period history:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});
 


// 🔹 User Authentication Routes
app.use("/api/users", userRoutes);

// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("WeatherCycle Backend is Running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/test-db", async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.json({ message: "DB Connected", users });
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ message: "Database connection error" });
    }
  });
  