import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Root React component that wires up client-side routing and notification support.
const App = () => {
	return (
		<div>
			<ToastContainer />{" "}
			{/* Global toast container used by react-toastify for success/error messages */}
			<Routes>
				{/* Application routes for each page */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/email-verify" element={<EmailVerify />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</div>
	);
};

export default App;
