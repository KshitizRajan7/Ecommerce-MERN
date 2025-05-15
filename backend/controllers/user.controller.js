import userModel from "../models/user.model.js"; // Import the user model for database operations
import  {createUser}  from "../services/user.services.js"; // Import the createUser function from user services
import {validationResult} from 'express-validator'; // Import validationResult from express-validator for handling validation errors    
import blacklistTokenModel from "../models/blacklistToken.model.js"; // Import the blacklist token model for blacklisting tokens

export const registerUser = async (req, res) => {
    const errors = validationResult(req); // Get validation errors from the request 
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }); // If there are validation errors, return a 422 status with the errors
    }
    const { fullName, email, password } = req.body; // Destructure the request body to get user details
    const hashedPassword = await userModel.hashPassword(password); // Hash the password using the hashPassword method from the user model
    try {
        const user = await createUser({ // Call the createUser function to create a new user
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
        });
        console.log("token");
        const token = user.generateAuthToken(); // Generate an authentication token for the user
        res.status(201).json({ // Return a 201 status with the created user and token
            token,user
        });
    } catch (error) {
        res.status(500).json({  message: "error in register.", error }); // If an error occurs, return a 500 status with the error message
    }
}

export const loginUser = async (req, res) => {
    const errors = validationResult(req); // Get validation errors from the request
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }); // If there are validation errors, return a 422 status with the errors
    }
    const { email, password } = req.body; // Destructure the request body to get email and password
    try {
        const user = await userModel.findOne({email }).select("+password"); // Find the user by email and select the password field
        if (!user) {
            return res.status(404).json({ error: "Invalid emal or password" }); // If user is not found, return a 404 status with an error message
        }
        const isMatch = await user.comparePassword(password); // Compare the provided password with the stored hashed password
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" }); // If passwords do not match, return a 401 status with an error message
        }
        const token = user.generateAuthToken(); // Generate an authentication token for the user
        res.cookie("token", token)
        res.status(200).json({ // Return a 200 status with the user and token
            token,user
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // If an error occurs, return a 500 status with the error message
    }
}

export const getUserProfile = async (req, res) => {
    res.status(200).json(req.user); // Return the user profile from the request object
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split[' '][1]; // Get the token from the request cookies
    console.log("token",token);
    await blacklistTokenModel.create({token}); // Blacklist the token (not implemented in this code)
    if(!token) {
        return res.status(401).json({ error: "NO token provided." }); // If no token is found, return a 401 status with an error message
    }
    await userModel.findByIdAndUpdate(req.user._id, { socketId: null }); // Update the user's socketId to null (not implemented in this code)
    res.clearCookie("token"); // Clear the authentication token cookie
    res.status(200).json({ message: "Logged out successfully" }); // Return a 200 status with a success message
}