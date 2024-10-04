import React from "react";

const NavBar = () => {
    return (
    <nav className="bg-theme1 h-16 p-4 flex justify-between items-center">
        <div className="text-4xl text-theme5 font-bold">MediHome</div>
        <div className="text-2xl text-white flex space-x-0 items-stretch ">
            <a href="#" className=" py-4 px-4 hover:text-green-600 hover:bg-white">จองบริการ</a>
            <a href="#" className=" py-4 px-4 hover:text-green-600 hover:bg-white">ประวัติการจอง</a>
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-white">ชีวา หนูน้อย</span>
            <a href="#" className="flex text-red-200 hover:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out mr-1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                ออกจากระบบ
            </a>
        </div>
    </nav>
    )
}

export default NavBar;