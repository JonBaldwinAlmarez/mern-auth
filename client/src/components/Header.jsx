import { Image, User } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Header = () => {
	// 1. All Hooks Must Live At The Top Level of the Component
	const navigate = useNavigate();
	const { userData, backendUrl, setUserData, setIsLoggedIn } =
		useContext(AppContext);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [confirmUsername, setConfirmUsername] = useState("");
	const [isDeleting, setIsDeleting] = useState(false); // Track loading states

	const deleteAccount = async () => {
		// Verification
		if (confirmUsername.trim() !== (userData?.name || "")) {
			toast.error("Please type your username exactly to confirm.");
			return;
		}

		try {
			setIsDeleting(true);
			axios.defaults.withCredentials = true;

			// Delete Data
			const { data } = await axios.delete(backendUrl + "/api/user/delete");

			// Reset data
			if (data.success) {
				setIsLoggedIn(false);
				setUserData(null);
				setShowDeleteModal(false);
				setConfirmUsername("");
				toast.success(data.message || "Account deleted successfully");
				navigate("/");
			} else {
				toast.error(data.message || "Could Not Delete Account");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
			<User className="w-36 h-36 mb-6" />
			<h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
				Hey {userData ? userData.name : "Developer !"}{" "}
				<Image className="w-8 aspect-square" />
			</h1>
			<h2 className="text-3xl sm:semibold mb-4">Welcome to my app</h2>
			<p className="mb-8 max-w-mb">This App Sends OTP to your email</p>

			{userData && (
				<button
					onClick={() => {
						setShowDeleteModal(true);
						setConfirmUsername("");
					}}
					className="border border-red-500 rounded-full px-8 py-3 hover:bg-red-100 transition-all cursor-pointer text-red-600 font-medium"
				>
					Delete Account
				</button>
			)}

			{/* Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
					<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-left">
						<h3 className="text-xl font-semibold mb-2 text-gray-900">
							Delete account?
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							This action is permanent. Type{" "}
							<span className="font-semibold text-gray-800">
								"{userData?.name}"
							</span>{" "}
							exactly to confirm.
						</p>

						<input
							type="text"
							value={confirmUsername}
							onChange={(e) => setConfirmUsername(e.target.value)}
							placeholder={userData?.name || "your username"}
							className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none focus:border-red-500 text-gray-800"
						/>

						<div className="mt-5 flex justify-end gap-3">
							<button
								disabled={isDeleting}
								onClick={() => {
									setShowDeleteModal(false);
									setConfirmUsername("");
								}}
								className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
							>
								Cancel
							</button>

							<button
								onClick={deleteAccount}
								disabled={
									confirmUsername.trim() !== (userData?.name || "") ||
									isDeleting
								}
								className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 min-w-20"
							>
								{isDeleting ? "Deleting..." : "Delete Account"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
