import http from 'http';
import app from './app.js';

const server= http.createServer(app); // Create an HTTP server using the Express app instance.
server.listen(process.env.PORT, () => { // Start the server on the specified port or default to 5000.
    console.log(`Server is running on port ${process.env.PORT}`); // Log the server's running port. 
})