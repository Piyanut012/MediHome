import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useEffect, useState } from "react";

const CusNavBar = () => {
  // require log in
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL + '/user/logged-in';
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const user = response.data.user;
        if (user.role !== "ลูกค้า") {
          enqueueSnackbar("คุณไม่มีสิทธิ์เข้าถึงหน้านี้", { variant: "error" });
          navigate("/");
        } else {
          setUser(user); // Set the user if role matches
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("กรุณาเข้าสู่ระบบ", { variant: "error" });
        navigate("/login");
      });
  }, [navigate, enqueueSnackbar]);
  if (!user) {
    return null;
  }
  // end require log in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    enqueueSnackbar("ออกจากระบบสำเร็จ", { variant: "success" });
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-theme1 h-16 p-4 flex justify-between items-center">
      <div className="text-4xl text-theme5 font-bold">MediHome</div>
      <div className="text-2xl text-theme4 flex space-x-0 items-stretch ">
        <Link
          to="/Booking"
          className=" py-4 px-4 hover:text-green-600 hover:bg-theme4"
        >
          จองบริการ
        </Link>
        <Link
          to="/History"
          className=" py-4 px-4 hover:text-green-600 hover:bg-theme4"
        >
          ประวัติการจอง
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-theme4">{user.name}</span>
        <button
          className="flex text-red-200 hover:text-red-400"
          onClick={handleLogout}
        >
          <PiSignOutBold className="inline align-middle size-6 mr-1" />
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
};

export default CusNavBar;
