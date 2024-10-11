import React, { useEffect } from "react";

const NavBar = () => {
  
  // useEffect hook to add click event listener for the menu toggle
  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    const handleToggle = () => {
      mobileMenu.classList.toggle('hidden'); // Toggle hidden class on click
    };

    menuToggle.addEventListener('click', handleToggle);

    // Clean up event listener when the component unmounts
    return () => {
      menuToggle.removeEventListener('click', handleToggle);
    };
  }, []);

  return (
    <nav className="bg-theme1 h-16 p-4 flex justify-between items-center">
      {/* Brand name */}
      <div className="text-4xl text-theme5 font-bold">MediHome</div>

      {/* Hamburger menu button for smaller screens */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none" id="menu-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Nav links for larger screens */}
      <div className="hidden md:flex text-2xl text-white space-x-0 items-stretch">
        <a href="#" className="py-4 px-4 hover:text-green-600 hover:bg-white">จองบริการ</a>
        <a href="#" className="py-4 px-4 hover:text-green-600 hover:bg-white">ประวัติการจอง</a>
      </div>

      {/* User info and log out for larger screens */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="text-white">ชีวา หนูน้อย</span>
        <a href="#" className="flex text-red-200 hover:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mr-1.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          ออกจากระบบ
        </a>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden absolute z-10 top-16 left-0 w-full bg-theme1 text-white hidden" id="mobile-menu">
        <a href="#" className="block py-2 px-4 hover:text-green-600 hover:bg-white">จองบริการ</a>
        <a href="#" className="block py-2 px-4 hover:text-green-600 hover:bg-white">ประวัติการจอง</a>
        <a href="#" className="block py-2 px-4 hover:text-green-600 hover:bg-white">ชีวา หนูน้อย</a>
        <a href="#" className="flex py-2 px-4 text-red-200 hover:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mr-1.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          ออกจากระบบ
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
