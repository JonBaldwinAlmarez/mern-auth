import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// Send cookies with every axios request so the backend can read the auth token.
axios.defaults.withCredentials = true;

// Shared application state for authentication and user profile data.
export const AppContext = createContext();

export const AppContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState("");

	// Check authentication status on app startup.
	const getAuthStatus = async () => {
		try {
			// API call of isAuth API end point
			const { data } = await axios.get(backendUrl + "/api/user/data");
			// Set login
			if (data.success) {
				setIsLoggedIn(true); // User is login
				getUserData(); // get user data
			}
		} catch (error) {
			if (error.response?.status === 401) {
				setIsLoggedIn(false);
			} else {
				toast.error(error.response?.data?.message || error.message);
			}
		}
	};

	// Fetch the current user's profile details from the server.
	const getUserData = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/user/data");
			data.success ? setUserData(data.userData) : toast.error(data.message);
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
		}
	};

	useEffect(() => {
		getAuthStatus();
	}, []);

	const value = {
		backendUrl,
		isLoggedIn,
		setIsLoggedIn,
		userData,
		setUserData,
		getUserData,
	};

	return (
		// Provide the context value to the childrens components
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
