import mongoose from "mongoose";
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1d", // Token will expire after 1 day
    },
    });

    const userModel = mongoose.model("BlacklistToken", blacklistTokenSchema); // Create a Mongoose model for the user schema
    export default userModel; // Export the user model for use in other modules