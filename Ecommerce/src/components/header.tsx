// src/components/Header.tsx
'use client'; // This component uses useState, so it must be a client component

import React, { useState } from 'react'; // Import useState
import Link from 'next/link';

function Header() { // Changed function name to 'Header' (uppercase for React component)
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    // You can add more links here
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen); // Correct logic to toggle the state
  };

  return (
    <div className="bg-gray-800 text-white shadow-md"> 
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo/Site Title */}
        <div className="text-2xl font-bold md:text-3xl select-none cursor-pointer">
          <h1>Ecommerce</h1> 
        </div>

      =
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((l, idx) => ( 
            <Link key={idx} href={l.href} className="group text-lg font-medium hover:text-blue-400 transition-colors duration-200">
              <div className="px-3 py-1 cursor-pointer rounded-lg hover:bg-gray-700"> {/* Added hover background */}
                {l.name}
              </div>
              {/* Underline effect on hover */}
              <hr className="w-0 group-hover:w-full h-[3px] mx-auto bg-blue-400 opacity-0 group-hover:opacity-100 border-0 rounded transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile Navbar Toggle Button (Hamburger Menu) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleNavBar} className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 rounded-md">
            {/* Hamburger Icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-gray-700 pb-3">
          {navLinks.map((l, idx) => (
            <Link key={idx} href={l.href} onClick={toggleNavBar} className="block px-4 py-2 text-base font-medium text-white hover:bg-gray-600">
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header; // Correctly export the component
