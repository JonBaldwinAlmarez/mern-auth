import { ArrowBigRight, Camera } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
	const navigate = useNavigate();
	const { userData, backendUrl, setUserData, setIsLoggedIn } =
		useContext(AppContext);
	return (
		<div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
			<Camera size={48} color="red" strokeWidth={1} className="w-28 sm:w-32" />
			{userData ? (
				<div>{userData.name[0].toUpperCase()}</div>
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
