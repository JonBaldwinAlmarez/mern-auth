import { Hand, Image } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
	const { userData } = useContext(AppContext);

	return (
		<div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
			<Image className="w-36 h-36 rounded-full mb-6" />
			<h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
				Hey {userData ? userData.name : "Developer !"}{" "}
				<Hand className="w-8 aspect-square" />
			</h1>
			<h2 className="text-3xl sm:semibold mb-4">Welcome to my app</h2>
			<p className="mb-8 max-w-mb">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi ante,
				hendrerit quis mauris non, cursus convallis risus. Vestibulum at quam
				tristique, malesuada leo at, pulvinar ligula.
			</p>
			<button className="border border-gray-500 rounded-full px-8 py-3 hover:bg-gray-100 transition-all cursor-pointer">
				Click me
			</button>
		</div>
	);
};

export default Header;
