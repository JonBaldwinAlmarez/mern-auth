import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	// Check Name | Email | Password

	if (!name || !email || !password) {
		return res.status(400).json({
			success: false,
			message: "Missing Details",
		});
	}

	try {
		// check existing user ID
		const existingUser = await userModel.findOne({
			email,
		});

		// Check existing user
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "user already exist",
			});
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
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		// Sending welcome email
		const mailOptions = {
			from: process.env.SENDER_EMAIL, // sender address
			to: email, // list of recipients
			subject: "Welcome to codingwithjon", // subject line
			text: `Welcome to codingwithjon. you account hace been created with email id: ${email}`, // plain text body
			html: "<b>Hello world!</b>", // HTML body
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return res.status(201).json({ success: true });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Controller function for user login

export const login = async (req, res) => {
	// Get email and password in req body
	const { email, password } = req.body;

	// email and password validation
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "Provide Email and Password",
		});
	}

	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid Email",
			});
		}

		// Get password in DB and Match w/ Password provided
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid Password",
			});
		}

		/* Create token */
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		// Send token to user in res and add cookie
		res.cookie("token", token, {
			// Send Property
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Controller function for user logout

export const logout = async (req, res) => {
	try {
		// Clear cookie
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});

		return res.status(200).json({
			success: true,
			message: "Logged Out",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Send verification OTP to the user's email
export const sendVerifyOtp = async (req, res) => {
	try {
		const { userId } = req.body;
		const user = await userModel.findById(userId);

		if (user.isAccountVerified) {
			return res.json({
				success: false,
				message: "Account already verified",
			});
		}
		// Generate OTP to be send to user
		const otp = String(Math.floor(100000 + Math.random() * 900000));

		// Save OTP to data based
		user.verifyOtp = otp;
		// verifyOtpExpireAt expire 1 day  from the current date and time
		user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

		// Save user to data based
		await user.save();

		// Send OTP to email
		const mailOption = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: "Account Verification ORT",
			text: `Your OTP is ${otp}. Verify your account using this OTP`,
		};
		await transporter.sendMail(mailOption);

		res.status(200).json({
			success: true,
			message: "Verification OTP sent on email",
		});
	} catch (error) {
		res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

// Get OTP and Verify user account

export const verifyEmail = async (req, res) => {
	// Get user ID and otp
	const { userId, otp } = req.body;

	//Check
	if (!userId || !otp) {
		res.status(404).json({ success: false, message: "Missing Details" });
	}

	try {
		//Find user
		const user = await userModel.findById(userId);

		// User validation
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Verify OTP

		if (user.verifyOtp === "" || user.verifyOtp !== otp) {
			return res.status(401).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		// Check expire date
		if (user.verifyOtpExpireAt < Date.now()) {
			return res.status(401).json({
				success: false,
				message: " OTP Expired",
			});
		}

		// Verify user account
		user.isAccountVerified = true;

		// Reset verifyOtp and verifyOtpExpireAt
		user.verifyOtp = "";
		user.verifyOtpExpireAt = 0;

		// Save user date
		await user.save();

		// Return response
		return res.status(200).json({
			success: true,
			message: "Email verify successfully",
		});

		// Created api controller function to verify user account via OTP
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Check if user is authenticated
// Api that will check if user is login or logout
export const isAuthenticated = async (req, res) => {
	try {
		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Send password to reset OTP
export const sendResetOtp = async (req, res) => {
	// get email ID from request body
	const { email } = req.body;
	// User validation
	if (!email) {
		return res.status(400).json({
			success: false,
			message: "Email is required",
		});
	}

	try {
		//Find user
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Generate OTP
		const otp = String(Math.floor(100000 + Math.random() * 900000));

		user.resetOtp = otp;
		user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;

		await user.save(); // Save to data base

		// Set message email
		const mailOption = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: "Account Verification OTP",
			text: `Your OTP resetting your password ${otp}. Use this OTP to proceed with resetting your password`,
		};
		// Send email
		await transporter.sendMail(mailOption);

		return res.status(200).json({
			success: true,
			message: "OTP sent to your email",
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Reset user password
export const resetPassword = async (req, res) => {
	// Get otp, user email id and new password
	const { email, otp, newPassword } = req.body;

	// Checking
	if (!email || !otp || !newPassword) {
		return res.status(400).json({
			success: false,
			message: "Email, OTP, new password are required",
		});
	}

	try {
		// Find user
		const user = await userModel.findOne({
			email,
		});
		// Verification
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "user not found",
			});
		}

		if (user.resetOtp === "" || user.resetOtp !== otp) {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		// Check expiry
		if (user.resetOtpExpireAt < Date.now()) {
			return res.status(401).json({
				success: false,
				message: "OTP expired",
			});
		}
		// Encryp password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user password
		user.password = hashedPassword;

		// Reset OTP and expiry
		user.resetOtp = "";
		user.resetOtpExpireAt = 0;

		// Save user
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Password has been reset successfully",
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
