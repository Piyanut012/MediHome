import  { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarPro from '../../components/NavBarpro';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ProvNavBar from "../../components/ProvNavBar";

function Confirm() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setUser(response.data.user); // Set the user data
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("กรุณาเข้าสู่ระบบ", { variant: "error" });
        navigate("/login");
      });
  }, [navigate, enqueueSnackbar]);

  const fetchData = async () => {
    if (user) {
    const apiUrl = import.meta.env.VITE_API_URL + `/user/appointment/${user._id}`;
    console.log("API URL:", apiUrl);
    try {
      const resp = await axios.get(apiUrl);
      console.log(resp.data);
      setAppointments(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    }}
  };

  useEffect(() => {
      fetchData();
  }, [user]);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/appointment/confirm/${id}`);
      setAppointments(appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status: 'confirmed' } : appointment
      ));
      console.log(`Confirmed appointment ID: ${id}`);
      enqueueSnackbar("ยืนยันการจองสำเร็จ", { variant: "success" });
      fetchData();
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/appointment/cancel/${id}`);
      setAppointments(appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status: 'cancel' } : appointment
      ));
      console.log(`Canceled appointment ID: ${id}`);
      enqueueSnackbar("ยกเลิกการจองสำเร็จ", { variant: "error" });
      fetchData();
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };
  
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className="text-lg text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div>
      <ProvNavBar />
      <div className='flex flex-col h-screen items-center text-xl'>
        <div className='p-[50px] text-right w-2/3 '>
          <p className="text-3xl text-theme1 text-[20px] mb-1">การจองทั้งหมด</p>
          <p className="text-base text-gray-900">ทั้งหมด <span className='text-yellow-600'>{appointments.length}</span> อัน</p>
        </div>
        <div className='grid md:grid-cols-3 md:gap-4 w-4/6'>
          {appointments.map((appointment) => (
            <div key={appointment._id} className="flex flex-col justify-center w-full p-6 bg-theme4 rounded-xl shadow-md">
              <div className='flex justify-between items-center mb-1'>
                <h2 className="text-xl font-bold text-gray-900">
                  {appointment.customerId.name ? appointment.customerId.name : "ชื่อผู้จอง"}
                </h2>
                <p className="text-sm text-blue-500">รอดำเนินการ</p>
              </div>
              <div className="p-2">
                <p className="text-sm text-gray-500">อายุ</p>
                <p className="text-base text-gray-900">{appointment.customerId.age || "ไม่มีข้อมูลอายุ"}</p>
              </div>

              <div className="p-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base text-gray-900">{appointment.customerId.email || "ไม่มีข้อมูลอีเมล"}</p>
              </div>

              <div className="p-2">
                <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                <p className="text-base text-gray-900">{appointment.customerId.phone || "ไม่มีข้อมูลเบอร์โทร"}</p>
              </div>
              <div className="p-2 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">วันที่เริ่มต้น</p>
                  <p className="text-base text-gray-900">
                    {appointment.date && appointment.date.startDate 
                      ? new Date(appointment.date.startDate).toLocaleDateString('th-TH') 
                      : "วันที่"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">วันที่สิ้นสุด</p>
                  <p className="text-base text-gray-900">
                    {appointment.date && appointment.date.endDate 
                      ? new Date(appointment.date.endDate).toLocaleDateString('th-TH') 
                      : "วันที่"}
                  </p>
                </div>
              </div>
              <hr className="my-3 " />
              <div className="flex justify-between">
                <button onClick={() => handleConfirm(appointment._id)} className="text-sm text-green-400">
                  ยืนยัน
                </button>
                <button onClick={() => handleDelete(appointment._id)} className="text-sm text-red-500">
                  ยกเลิก
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Confirm;
