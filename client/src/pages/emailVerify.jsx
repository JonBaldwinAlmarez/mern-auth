import React from "react";
import { Navigate } from "react-router-dom";

const EmailVerify = () => {
	return (
		<div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-gray-100 to-gray-500">
			<Image
				onClick={() => Navigate("/")}
				className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
			/>
			<form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
				<h1 className="text-white text-2xl font-semibold text-center mb-4">
					Email verify OTP
				</h1>
				<p className="text-center mb-6 text-indigo-300">Enter 6 digit code</p>
			</form>
		</div>
	);
};

export default EmailVerify;
