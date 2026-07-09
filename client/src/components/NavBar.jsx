import { ArrowBigRight, Image } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
	const navigate = useNavigate();
	const { userData, backendUrl, setUserData, setIsLoggedIn } =
		useContext(AppContext);

	const logout = async () => {
		try {
			axios.defaults.withCredentials = true;
			// Make API call & get data
			const { data } = await axios.post(
				backendUrl + "/api/auth/logout",
				{},
				{ withCredentials: true },
			);

			data.success && setIsLoggedIn(false);
			data.success && setUserData(false);
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const sendVerificationOtp = async () => {
		try {
			axios.defaults.withCredentials = true;
			// API call to send verification OTP api endpoint
			const { data } = await axios.post(
				backendUrl + "/api/auth/send-verify-otp",
				{},
				{ withCredentials: true },
			);
			if (data.success) {
				// Navigate user to email page /email-verify
				navigate("/email-verify");
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
			<Image size={48} color="red" strokeWidth={1} className="w-28 sm:w-32" />
			{userData ? (
				<div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white relative group">
					{userData.name[0].toUpperCase()}
					<div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-full pt-10">
						<ul className="list-none m-0 p-2 bg-gray-100 text-sm">
							{!userData.isAccountVerified && (
								<li
									onClick={sendVerificationOtp}
									className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
								>
									Verify Email
								</li>
							)}

							<li
								onClick={logout}
								className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
							>
								Logout
							</li>
						</ul>
					</div>
				</div>
			) : (
				<button
					onClick={() => navigate("/login")}
					className="flex items-center gap-2 border border-gray-500 rounded-full
			 py-3 px-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
				>
					Login <ArrowBigRight />
				</button>
			)}
		</div>
	);
};

export default NavBar;
