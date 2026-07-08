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
	"https://mern-auth-dgg5.onrender.com",
];

// Parse JSON payloads from client requests.
app.use(express.json());
// Parse cookie headers so we can read JWT tokens stored in cookies.
app.use(cookieParser());
// Enable CORS for the local frontend and allow cookies to be sent.
app.use(cors({ origin: allowedOrigins, credentials: true }));

/* API end points */
app.get("/", (req, res) => {
	res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); // get user name

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
