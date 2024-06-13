// auth router 
const db = require("../models/index")
const bcrypt = require('bcrypt');
const User = db.user
const { body, validationResult } = require("express-validator")
const jwt = require('jsonwebtoken');



const createRegister = async (req, res) => {
    try {
        const userData = req.body;

        // Validate password
        const password = userData.password;
        const lengthRegex = /^.{8,18}$/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        // Check if email exists
        const emailExist = await User.findOne({ where: { email: userData.email } });
        if (emailExist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        if (!lengthRegex.test(password)) {
            return res.status(400).json({ error: "Password must be between 8 and 18 characters long" });
        }
        if (!uppercaseRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
        }
        if (!lowercaseRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
        }
        if (!numberRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one number" });
        }
        if (!specialCharRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one special character" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        // Create new user
        const newUser = await User.create(userData);
        res.status(201).json({
            success: true,
            message: "Registration done successfully",
            data: newUser
        });
    } catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({ error: "Internal server problem" });
    }
};

const generateAccessToken = async (user) => {

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role, // Include the role here
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    // console.log("playload", payload)
    const token = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "10h" });
    return token;
}

const createLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        // console.log("Retrieved user:", user);

        // Check if user exists
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log("Password match:", passwordMatch);

        // If password does not match
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate access token
        const accessToken = await generateAccessToken(user);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            access_token: accessToken,
            tokenType: 'Bearer',
            data: user
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
module.exports = {
    createRegister,
    createLogin
}