import express from 'express'
import { configDotenv } from 'dotenv';
configDotenv(); // Load environment variables from a .env file into process.env
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests.
import cookieParser from 'cookie-parser'; // Import cookie-parser middleware for parsing cookies.
import {connectDB} from './database/db.js'; // Import the database connection function.
import userRouter from './routes/user.route.js'; // Import the user router for handling user-related routes.
import sellerRouter from './routes/seller.route.js'; // Import the seller router for handling seller-related routes.

connectDB(); // Call the function to connect to the database.


const app = express();

app.use(cors()); // middleware to enable CORS (Cross-Origin Resource Sharing).
app.use(express.json()); // middleware to parse incoming JSON requests.
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded data.
app.use(cookieParser()); // middleware to parse cookies.
app.get('/',async(req,res)=>{
    res.send('Hello World!');
});

app.use('/users', userRouter); // route for user-related operations.
app.use('/sellers', sellerRouter); // route for seller-related operations.
    

export default app; // export the app instance for use in other modules.