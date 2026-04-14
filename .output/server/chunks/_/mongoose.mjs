import mongoose from 'mongoose';

let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    return;
  }
  const mongodbUri = process.env.MONGODB_URI;
  console.log(mongodbUri);
  try {
    await mongoose.connect(mongodbUri, {
      dbName: "nuxt-board"
    });
    isConnected = true;
    console.log("MongoDB Atlas \uC5F0\uACB0 \uC131\uACF5");
    console.log("\uC5F0\uACB0\uB41C DB:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("MongoDB \uC5F0\uACB0 \uC2E4\uD328:", error.message);
    throw error;
  }
};

export { connectDB as c };
//# sourceMappingURL=mongoose.mjs.map
