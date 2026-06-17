import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
	try {
		const userId = req.userId;

		// Find user
		const user = await userModel.findById(userId);

		// Validation
		if (!userId) {
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
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
