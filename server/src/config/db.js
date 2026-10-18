import mongoose from 'mongoose';

let mongoServer;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('\n[Database Error] MONGO_URI environment variable is missing.');
    console.error('Please configure MONGO_URI in your environment or .env file.\n');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n[Database Error] Failed to connect to MongoDB: ${error.message}`);

    if (process.env.NODE_ENV !== 'production' && process.env.USE_MEMORY_DB_FALLBACK === 'true') {
      console.log(`[+] Spinning up a local In-Memory MongoDB Database for development instead...`);
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri);
        console.log(`[+] Local In-Memory MongoDB Connected successfully: ${uri}\n`);
      } catch (memErr) {
        console.error(`Failed to start In-Memory MongoDB fallback: ${memErr.message}`);
        process.exit(1);
      }
    } else {
      console.error('Exiting process due to database connection failure.\n');
      process.exit(1);
    }
  }
};

export default connectDB;
