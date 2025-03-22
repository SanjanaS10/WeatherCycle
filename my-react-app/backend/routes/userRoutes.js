const express = require("express");
const bcrypt = require("bcryptjs"); // ✅ Use bcryptjs
const User = require("../models/User");

const router = express.Router();

// ✅ User Signup (Registers a New User)
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        // ❌ Remove extra hashing here!
        user = new User({ email, password });  // ✅ Password will be hashed automatically in User.js
        await user.save();

        res.status(201).json({ user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again." });
    }
});

// ✅ User Login (Authenticates & Returns User Data)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: { _id: user._id, email: user.email, periodHistory: user.periodHistory },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Fetch User's Period History
router.get("/history", async (req, res) => {
    const { email } = req.query;

    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ periodHistory: user.periodHistory });
    } catch (err) {
        console.error("Error fetching period history:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Add a New Period Entry
router.post("/add-period", async (req, res) => {
    const { email, periodData } = req.body;

    if (!email || !periodData) {
        return res.status(400).json({ message: "Email and period data are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.periodHistory.push(periodData); // ✅ Adds new period entry
        await user.save();

        res.json({ message: "Period history updated!", periodHistory: user.periodHistory });
    } catch (error) {
        console.error("Add Period Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Logout User
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
