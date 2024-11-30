

// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config();

// const uri = process.env.ATLAS_DATABASE_URL

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function dbConnect() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }


// const dbClose = async () => {
//   await mongoose.connection.close();
//   console.log("Closed database connection");
// }

// export { dbClose, dbConnect }