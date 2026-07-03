import userModel from "../models/userModel.js";

// Controller to return authenticated user profile details.
export const getUserData = async (req, res) => {
	try {
		const userId = req.userId;

		// Find user
		const user = await userModel.findById(userId);

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
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Controller to delete the authenticated user's account and clear auth cookies.
export const deleteUser = async (req, res) => {
	try {
		// Check User ID
		if (!req.userId) {
			return res.status(401).json({
				success: false,
				message: "Not Authorized",
			});
		}

		// Delete User By ID
		const deletedUser = await userModel.findByIdAndDelete(req.userId);

		// Verify if deleted
		if (!deletedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Clear Cookie
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});

		return res.status(200).json({
			success: true,
			message: "Account deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
