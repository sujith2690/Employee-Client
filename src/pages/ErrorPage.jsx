import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center  text-black p-6">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-red-500">
                404
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">Page Not Found</h2>

            <p className="mt-4 text-lg text-gray-400 text-center max-w-md">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-black to-red-500 text-white rounded-lg text-lg hover:scale-105 transform transition duration-300">
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;
