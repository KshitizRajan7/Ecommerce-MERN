import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator"; // Import express-validator for request validation
import { authUser } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/register",
    [body("fullName.firstName").notEmpty().withMessage("First name is required"),
        body("email").isEmail().withMessage("Email must be valid").notEmpty().withMessage("Email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ],
        registerUser
);

router.post("/login",
    [body("email").isEmail().withMessage("Email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ],
        loginUser
);

router.get("/profile",authUser, getUserProfile); // Route to get user profile
router.get("/logout",authUser, logoutUser); // Route to logout user

export default router; // Export the router for use in other modules