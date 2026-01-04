import { User } from "lucide-react";

const Header = () => {
    return (
        <header className="w-full h-20 bg-gray-100 fixed top-0 left-0 shadow-md">
            <div className="w-full h-full px-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Translation Docs</h1>

                <User size={24} />
            </div>
        </header>
    );
};

export default Header;
