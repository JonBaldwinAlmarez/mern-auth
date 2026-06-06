import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext(); // Create a context for the app

export const AppContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState("");

	// Get user data
	const getUserData = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/user/data");
			data.success ? setUserData(data.userData) : toast.error(data.message);
		} catch (error) {
			toast.error(error);
			console.log("Error:	", error);
		}
	};

	const value = {
		backendUrl,
		isLoggedIn,
		setIsLoggedIn,
		userData,
		setUserData,
		getUserData,
	};

	return (
		// Provide the context value to the children components
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
