import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
	try {
		const userId = req.userId;
		//console.log("req.userId:", req.userId);
		// Find user
		const user = await userModel.findById(userId);

		console.log("user:", user);
		// Validation
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found",
			});
		}

		// Get user details
		res.status(200).json({
			success: true,
			userData: {
				name: user.name,
				isAccountVerified: user.isAccountVerified,
			},
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
