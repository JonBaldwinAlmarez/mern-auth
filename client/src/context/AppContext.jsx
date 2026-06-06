import { createContext, useState } from "react";

export const AppContext = createContext(); // Create a context for the app

export const AppContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState("");
	const value = {
		backendUrl,
		isLoggedIn,
		setIsLoggedIn,
		userData,
		setUserData,
	};
	console.log(import.meta.env);
	console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
	console.log("Value: ", value);

	return (
		// Provide the context value to the children components
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
