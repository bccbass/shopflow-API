import app from './server.js'
import dotenv from 'dotenv'
dotenv.config();


const PORT = process.env.PORT || 8080


  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });




