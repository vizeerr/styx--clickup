import mongoose from "mongoose";

// new db config
export default async function connect() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB');
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
    });

    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB Connected');
    });

    connection.on('error', (error) => {
      console.error('MongoDB Connection Error:', error);
    });

    connection.on('disconnected', () => {
      console.log('MongoDB Disconnected');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
