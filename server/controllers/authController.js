import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	// Check Name | Email | Password

	if (!name || !email || !password) {
		return res.json({ success: false, message: "Missing Details" });
	}

	try {
		// check existing user ID
		const existingUser = await userModel.findOne({
			email,
		});
		// Check existing user
		if (existingUser) {
			return res.json({ success: false, message: "user already exist" });
		}

		// Creat hashed password
		const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password

		// Create user
		const user = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		// Save user to the mongoDB
		await user.save();

		/* Create token */

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		// Send token to user in res and add cookie
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strick",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};
