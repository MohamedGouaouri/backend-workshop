import mongoose from 'mongoose'

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
    console.log("database connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

