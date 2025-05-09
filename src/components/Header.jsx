import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full z-50 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="text-xl font-medium antialiased mix-blend-difference italic">
          YP
        </div>
        <nav className="flex space-x-6">
          <a href="#about" className="text-gray-400 hover:text-blue-400">
            About
          </a>
          <a href="#projects" className="text-gray-500 hover:text-blue-500">
            Projects
          </a>
          <a href="#footer" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
