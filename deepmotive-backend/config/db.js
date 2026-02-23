const mongoose = require("mongoose");

// MongoDB Atlas connection string
// const uri =
//   "mongodb+srv://anasnaeem998:<db_password>@cluster0.abio0.mongodb.net/?appName=Cluster0";

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch((err) => console.log("MongoDB Connection Error ❌", err));

// import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// export default

module.exports = connectDB;
