import userModel from "../models/user.model.js"; // Import the user model for database operations
import driverModel from "../models/seller.model.js"; // Import the seller model for database operations
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation and verification
import blacklistTokenModel from "../models/blacklistToken.model.js"; // Import the blacklist token model for blacklisting tokens    

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get the token from cookies or authorization header
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" }); // If no token is provided, return a 401 status with an error message
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token }); // Check if the token is blacklisted
    if (isBlacklisted) {
        return res.status(401).json({ error: "Unauthorized" }); // If token is blacklisted, return a 401 status with an error message
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        const user = await userModel.findById(decoded._id); // Find the user by ID from the decoded token
        if (!user) {
            return res.status(404).json({ error: "User not found." }); // If user is not found, return a 404 status with an error message
        }
        req.user = user; // Attach the user to the request object for use in subsequent middleware/routes
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("token verfication error",error); // Log the error to the console
        return res.status(401).json({ error: "Unauthorized" }); // If token verification fails, return a 401 status with an error message
    }
}

export const authSeller = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get the token from cookies or authorization header
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" }); // If no token is provided, return a 401 status with an error message
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token }); // Check if the token is blacklisted
    if (isBlacklisted) {
        return res.status(401).json({ error: "Unauthorized" }); // If token is blacklisted, return a 401 status with an error message
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        const seller = await driverModel.findById(decoded._id); // Find the seller by ID from the decoded token
        if (!seller) {
            return res.status(404).json({ error: "Seller not found." }); // If seller is not found, return a 404 status with an error message
        }
        req.seller = seller; // Attach the seller to the request object for use in subsequent middleware/routes
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("token verfication error",error); // Log the error to the console
        return res.status(401).json({ error: "Unauthorized" }); // If token verification fails, return a 401 status with an error message
    }
}
