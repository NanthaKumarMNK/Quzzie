const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { name, password, email, cPassword} = req.body;

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
        if (password.length<4){
            return res.status(401).json({password : "Weak password"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
const hashedCPassword = await bcrypt.hash(cPassword, 10);



if (hashedPassword === hashedCPassword) {
    // console.log('Hashed passwords match.');
} else {
    res.json({ cPassword: "Password did not match" });
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
};

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