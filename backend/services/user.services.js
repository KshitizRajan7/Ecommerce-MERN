import userModel from "../models/user.model.js"; // Import the user model for database operations

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required"); // Check if all required fields are provided
    
}
const existingUser = await userModel.findOne({ "email": email });
if (existingUser) {
throw new Error("Email already exists"); // If email is already taken, throw an error
}
  const user = await userModel.create({ // user is a promise not a user object
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });
  return user; // Create a new user in the database
};
