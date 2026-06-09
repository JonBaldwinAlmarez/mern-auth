import React from "react";

const EmailVerify = () => {
	const inputRefs = React.useRef([]);

	return (
		<div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-gray-100 to-gray-500">
			<Image
				onClick={() => navigate("/")}
				className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
			/>
			<form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
				<h1 className="text-white text-2xl font-semibold text-center mb-4">
					Email verify your OTP
				</h1>
				<p className="text-center mb-6 text-indigo-300">Enter 6 digit codes</p>

				{/* Input field */}
				<div className="flex justify-between mb-8">
					{Array(6)
						.fill(0)
						.map((_, index) => {
							<input
								type="text"
								maxLength="1"
								key={index}
								required
								className="w-12 h-12 bg-[333A5C] text-white text-center text-xl rounded-md"
								ref={(e) => (inputRefs.current[index] = e)}
							/>;
						})}
				</div>
				<button className="w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
					Verify email
				</button>
			</form>
		</div>
	);
};

export default EmailVerify;
