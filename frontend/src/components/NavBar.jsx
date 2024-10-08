import React from "react";
import { PiSignOutBold } from "react-icons/pi";

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
            <PiSignOutBold className="inline align-middle size-6 mr-1"/>ออกจากระบบ
            </a>
        </div>
    </nav>
    )
}

export default NavBar;