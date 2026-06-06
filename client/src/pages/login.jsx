import { Image, Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();

	const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

	const [state, setState] = useState("Sign up");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault(); // Prevent default reload
			console.log("Form submitted");
			// Send cookie
			axios.defaults.withCredentials = true;

			// Check status Sign up or login
			if (state === "Sign up") {
				// Hit user registration API
				const { data } = await axios.post(backendUrl + "/api/auth/register", {
					name,
					email,
					password,
				}); // make API call

				// Check response data
				if (data.success) {
					setIsLoggedIn(true);
					getUserData();
					navigate("/");
				} else {
					toast.error(data.message);
				}
			} else {
				// Hit user logggin API call

				const { data } = await axios.post(backendUrl + "/api/auth/login", {
					email,
					password,
				}); // make API call

				// Check response data
				if (data.success) {
					setIsLoggedIn(true);
					getUserData();
					navigate("/");
					toast.success("TOAST TEST");
				} else {
					toast.error(data.message);
				}
			}
		} catch (error) {
			console.log("ERROR RESPONSE:", error.response?.data);

			toast.error(
				error.response?.data?.message || error.message || "Login failed",
			);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-gray-100 to-gray-500">
			<Image
				onClick={() => navigate("/")}
				className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
			/>
			<div className="bg-slate-900 p-10 rounded-lg  shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
				<h2 className="text-3xl font-semibold text-center text-white mb-3">
					{state === "Sign up" ? "Create Your Account" : "Login"}
				</h2>
				<p className="text-center text-sm mb-3">
					{state === "Sign up" ? "Create Account" : "Login"}
				</p>

				<form onSubmit={onSubmitHandler}>
					{state === "Sign up" && (
						<div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
							<Image />
							<input
								className="bg-transparent outline-none"
								onChange={(e) => setName(e.target.value)}
								value={name}
								type="text"
								placeholder="Full Name"
								required
							/>
						</div>
					)}

					<div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
						<Mail />
						<input
							className="bg-transparent outline-none"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							type="email"
							placeholder="Email"
							required
						/>
					</div>
					<div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
						<Lock />
						<input
							className="bg-transparent outline-none"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
							placeholder="Password"
							required
						/>
					</div>
					<p
						onClick={() => navigate("/reset-password")}
						className="mb-4 text-indigo-500 cursor-pointer hover:text-white"
					>
						Forgot Pasword
					</p>
					<button className="w-full py-2.5 rounded-full bg-linear-to-r from-indigo-300 to-indigo-800 text-white font-medium">
						{state}
					</button>
				</form>

				{state === "Sign up" ? (
					<p className="text-gray-200 text-center text-xs mt-4">
						Already have account?
						<span
							onClick={() => setState("Login")}
							className="text-blue-400 cursor-pointer underline"
						>
							Login Here
						</span>
					</p>
				) : (
					<p className="text-gray-200 text-center text-xs mt-4">
						You don't have account?
						<span
							onClick={() => setState("Sign up")}
							className="text-blue-400 cursor-pointer underline"
						>
							Sign up here
						</span>
					</p>
				)}
			</div>
		</div>
	);
};

export default Login;
