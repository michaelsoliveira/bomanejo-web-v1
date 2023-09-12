/* eslint-disable @next/next/link-passhref */
import React, { useState, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSideBar = () => {
    setSidebar(!sidebar)
  }

  return (
    <>
      <div className="relative min-h-screen md:flex">

      <div className="bg-gray-100 text-gray-700 flex justify-between md:hidden">
        
        <a href="#" className="block p-4 text-gray-800 font-bold">BOManejo</a>

        
          <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
            onClick={handleSideBar}
          >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      
        <div className={sidebar ? 'bg-gray-100 text-green-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 -translate-x-full transform md:relative md:translate-x-0 transition duration-200 ease-in-out' : 'bg-gray-100 text-green-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out'}>

        
        <a href="#" className="text-green-600 flex items-center space-x-2 px-4">
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span className="text-2xl font-extrabold">BOManejo</span>
        </a>

        
        <nav>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white">
            Home
          </a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white">
            About
          </a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white">
            Features
          </a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white">
            Pricing
          </a>
        </nav>
      </div>

      
      <div className="flex-1 p-10 text-2xl font-bold">
        content goes here
      </div>

    </div>
      {/* <IconContext.Provider value={{ color: '#fff' }}>
        <div classNameName='navbar'>
          <Link href='#'>
            <FaIcons.FaBars classNameName='menu-bars' onClick={showSidebar} />
          </Link>
        </div>
        <nav classNameName={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul classNameName='nav-menu-items' onClick={showSidebar}>
            <li classNameName='navbar-toggle'>
              <Link href='#'>
                <AiIcons.AiOutlineClose classNameName='menu-bars' />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} classNameName="nav-text">
                  
                    {item.icon}
                    <span classNameName="span">{item.title}</span>
                  
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider> */}
    </>
  );
}

export default Navbar;