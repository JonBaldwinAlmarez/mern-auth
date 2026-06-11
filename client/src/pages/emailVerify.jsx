import React, { useContext } from "react";
import { Camera } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
	// Store OTP
	axios.defaults.withCredentials = true; // Add cookies in the request
	const { backendUrl, isLoggedIn, userData, getUserData } =
		useContext(AppContext);

	const navigate = useNavigate();
	const inputRefs = React.useRef([]);

	const handleInput = (e, index) => {
		if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
			inputRefs.current[index + 1].focus();
		}
	};

	// Delete functionality
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && e.target.value === "" && index > 0) {
			// Move focus to prev. key
			inputRefs.current[index - 1].focus();
		}
	};
	// Handle automatic copy-paste functionality
	const handlePaste = (e) => {
		const paste = e.clipboardData.getData("text");
		const pasteArray = paste.split("");
		pasteArray.forEach((char, index) => {
			if (inputRefs.current[index]) {
				inputRefs.current[index].value = char;
			}
		});
	};

	const submitHandler = async (e) => {
		try {
			e.preventDefault(); // Prevent default Loading during submit
			const otparray = inputRefs.current.map((e) => {
				e.value;
			}); // get OTP

			const otp = otparray.join("");
			// Send otp to backend API
			const { data } = await axios.post(
				backendUrl + "/api/auth/verify-account",
				{ otp },
			);

			if (data.success) {
				toast.success(data.message);
				getUserData(); // get user data
				navigate("/");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-gray-100 to-gray-500">
			<Camera className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer" />
			<form
				onSubmit={submitHandler}
				className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
			>
				<h1 className="text-white text-2xl font-semibold text-center mb-4">
					Email verify OTP
				</h1>
				<p className="text-center mb-6 text-indigo-300">Enter 6 digit codes</p>

				{/* Input field */}
				<div className="flex justify-between mb-8" onPaste={handlePaste}>
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<input
								type="text"
								maxLength="1"
								key={index}
								required
								className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
								ref={(e) => (inputRefs.current[index] = e)}
								onInput={(e) => handleInput(e, index)} // Solve Manual Input
								onKeyDown={(e) => handleKeyDown(e, index)}
							/>
						))}
				</div>
				<button className="w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
					Verify email
				</button>
			</form>
		</div>
	);
};

export default EmailVerify;
