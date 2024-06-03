const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { name, password, email, cPassword} = req.body;

        if (!/^[a-zA-Z]+$/.test(name)) {
            return res.status(400).json({
                name: "Invalid name",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                email: "Invalid email",
            });
        }

        if (!name || !email || !password || !cPassword) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ errorMessage: "User already exists" });
        }

        if (password.length < 4){
            return res.status(400).json({
                password: "Weak password",
            });
        }

        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        const match = await bcrypt.compare(cPassword, hashedPassword);
        if (!match) {
            return res.status(400).json({
                cPassword: "password doesn’t match",
            });
        }
        
        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
}


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRTE_KEY
        );

     
        res.cookie("token", token, { httpOnly: true }); 
        res.cookie("userId", userDetails.userId, { httpOnly: true });

        res.json({
            message: "User logged in",
            userId: userDetails._id,
            token: token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { loginUser, registerUser };