import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWTs

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
},
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h", // Token expiration time
    }
  );
  return token; // Return the generated token
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Hash the password with the generated salt
};

const userModel = mongoose.model("User", userSchema); // Create a Mongoose model for the user schema
export default userModel; // Export the user model for use in other modules
