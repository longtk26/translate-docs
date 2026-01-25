import { Link } from "react-router";
import { User, FileText, CreditCard, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
    // Mock user - replace with actual auth state
    const user = {
        name: "John Doe",
        email: "john@example.com",
        avatar: null,
    };

    const isAuthenticated = true; // Replace with actual auth check

    return (
        <header className="w-full h-16 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
            <div className="w-full h-full px-8 flex items-center justify-between max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    <h1 className="text-xl font-bold text-gray-900">
                        TranslateDocs
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/upload"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Upload
                    </Link>
                    <Link
                        to="/documents"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Documents
                    </Link>
                    <Link
                        to="/pricing"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/glossary"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Glossary
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full bg-indigo-600"
                                >
                                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-medium">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.name}
                                        </p>
                                        <p className="text-xs leading-none text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/profile"
                                        className="cursor-pointer"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/documents"
                                        className="cursor-pointer"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>My Documents</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/profile#subscription"
                                        className="cursor-pointer"
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Subscription</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/profile#settings"
                                        className="cursor-pointer"
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link to="/auth/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/auth/register">Sign up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
