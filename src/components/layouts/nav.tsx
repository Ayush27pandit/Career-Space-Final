import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 z-30  w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-Roboto font-semibold">
          <a href="#">CodeSphere</a>
        </div>

        {/* Navigation Links */}
        <div>
        <img src="public/icons/🦆 icon _menu_.png" className='block md:hidden h-[30px] w-[30px] cursor-pointer'/>
        <ul className="md:flex space-x-4 font-poppins hidden">
          <li>
            <a href="#home" className="text-white hover:bg-gray-700 p-2 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-white hover:bg-gray-700 p-2 rounded">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="text-white hover:bg-gray-700 p-2 rounded">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:bg-gray-700 p-2 rounded">
              Contact
            </a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
