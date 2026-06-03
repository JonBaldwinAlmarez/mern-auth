import { ArrowBigRight, Camera } from "lucide-react";

const NavBar = () => {
	return (
		<div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
			<Camera size={48} color="red" strokeWidth={1} className="w-28 sm:w-32" />
			<button
				className="flex items-center gap-2 border border-gray-500 rounded-full
			 py-6 px-2 text-gray-800 hover:bg-gray-100 transition-all"
			>
				Login <ArrowBigRight />
			</button>
		</div>
	);
};

export default NavBar;
