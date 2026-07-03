import mongoose from "mongoose";

// Connect to the MongoDB database using the URI from environment variables.
const connectDB = async () => {
	mongoose.connection.on("connected", () => {
		console.log("Database Connected!!!");
	});
	await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
};

export default connectDB;
