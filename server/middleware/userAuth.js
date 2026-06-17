// Find token from the cookie then from token fin user ID
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
	const { token } = req.cookies; // Get token from cookie

	// Check token
	if (!token) {
		// Allow request to proceed - controller will handle unauthenticated case
		return next();
	}

	// Decode token from cookie
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// Find ID
		if (decodedToken.id) {
			// Add ID in the req body
			req.userId = decodedToken.id;
		} else {
			// return response
			return res.status(400).json({
				success: false,
				message: "Not Authorized",
			});
		}
		next(); // call controller function sendVerifyOtp()
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

export default userAuth;
