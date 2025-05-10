import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaRegUser } from "react-icons/fa";
import { GiCircleClaws } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            }
        }
    }, []);

    const handleLog = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="p-4 bg-gray-100 text-gray-800 shadow-md">
            <div className="container mx-auto flex justify-between items-center h-16 relative">
                <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
                    <GiCircleClaws className="font-extrabold text-5xl text-blue-600" />
                    Employ Circle
                </Link>

                <div className="flex items-center">
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                    </nav>

                    {user && (
                        <div className="hidden md:flex items-center gap-2 ml-4 shadow-2xl p-2 cursor-pointer relative"
                            onClick={() => setShowLogout(prev => !prev)}
                        >
                            <FaRegUser className="text-xl" />
                            <span className="text-sm font-medium text-blue-600">{user.name}</span>

                            {showLogout && (
                                <button
                                    onClick={handleLog}
                                    className="absolute top-full mt-2 right-0 bg-red-500 text-white text-sm px-4 py-1 rounded shadow"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-2xl text-gray-700"
                >
                    <FiMenu />
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-50 border-t mt-2 px-4 py-3 space-y-2">
                    <Link to="/" className="block hover:text-blue-600 text-center">Home</Link>
                    {user && (
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <FaRegUser className="text-xl" />
                                <span className="text-sm">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLog}
                                className="bg-red-500 text-white text-sm px-4 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
