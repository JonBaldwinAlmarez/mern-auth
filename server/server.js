import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authroutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB before handling any requests.
connectDB();

const allowedOrigins = [
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"https://mern-login-auth.netlify.app",
	"https://mern-auth-dgg5.onrender.com",
	process.env.CORS_ORIGIN,
].filter(Boolean);

// Parse JSON payloads from client requests.
app.use(express.json());
// Parse cookie headers so we can read JWT tokens stored in cookies.
app.use(cookieParser());

// Purpose: Configure CORS to allow only trusted frontend applications
// to access this backend and specify which requests are permitted.

app.use(
	cors({
		// Check if the request comes from an allowed origin.
		origin: (origin, callback) => {
			// Allow requests with no origin (e.g., Postman) or from trusted websites.
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Approve the request.
			} else {
				callback(new Error("Not allowed by CORS")); // Reject the request.
			}
		},

		credentials: true, // Allow cookies and authentication credentials.

		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods.

		allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers.
	}),
);

// Purpose: Handle CORS preflight (OPTIONS) requests before the actual request is sent.

app.options(
	"*", // Apply this CORS configuration to all routes.
	cors({
		// Check if the request comes from an allowed origin.
		origin: (origin, callback) => {
			// Allow requests with no origin (e.g., Postman) or from trusted websites.
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Approve the request.
			} else {
				callback(new Error("Not allowed by CORS")); // Reject the request.
			}
		},

		credentials: true, // Allow cookies and authentication credentials.
	}),
);

/* API end points */
app.get("/", (req, res) => {
	res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
