import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`\n[!] Atlas Connection Failed:`);
    console.error(`Name: ${error.name}, Code: ${error.code}, Message: ${error.message}`);
    
    if (process.env.USE_MEMORY_DB_FALLBACK === 'true') {
      console.log(`[+] Spinning up a local In-Memory MongoDB Database for development instead...`);
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      
      await mongoose.connect(uri);
      console.log(`[+] Local In-Memory MongoDB Connected successfully: ${uri}\n`);
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;
