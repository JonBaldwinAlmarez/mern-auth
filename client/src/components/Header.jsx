import { Image, User } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Header = () => {
	const { userData } = useContext(AppContext);

	const deleteAccount = () => {
		toast.success("Click");
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
			<button
				onClick={deleteAccount}
				className="border border-red-500 rounded-full px-8 py-3 hover:bg-red-100 transition-all cursor-pointer"
			>
				Delete Account
			</button>
		</div>
	);
};

export default Header;
