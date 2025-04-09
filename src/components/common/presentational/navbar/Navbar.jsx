// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xl">Popular News</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
