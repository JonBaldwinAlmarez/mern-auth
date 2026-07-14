// Middleware to authenticate requests using the JWT stored in cookies.
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
	const { token } = req.cookies; // Get token from cookie

	// If there is no auth cookie, move on and let the route decide.
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Not Authorized",
		});
	}

	// Try to verify the token and populate req.userId for later controllers.
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
