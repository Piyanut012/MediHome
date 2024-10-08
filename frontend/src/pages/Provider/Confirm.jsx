import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarPro from '../../components/NavBarpro';

function Confirm() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL + '/user/appointment';
      console.log("API URL:", apiUrl);
      try {
        const resp = await axios.get(apiUrl);
        console.log(resp.data);
        setAppointments(resp.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/appointment/confirm/${id}`);
      setAppointments(appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status: 'confirmed' } : appointment
      ));
      console.log(`Confirmed appointment ID: ${id}`);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจว่าจะยกเลิกการจองนี้หรือไม่?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/appointment/${id}`);
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
        console.log(`Deleted appointment ID: ${id}`);
      } catch (error) {
        console.error("Error confirming appointment:", error);
      }
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
      <NavBarPro />
      <div className='flex flex-col h-screen items-center text-xl'>
        <div className='p-[50px] text-right w-2/3 '>
          <p className="text-sm text-gray-600 text-[20px] mb-1">การจองทั้งหมด</p>
          <p className="text-base text-gray-900">ทั้งหมด <span className='text-yellow-600'>{appointments.length}</span> อัน</p>
        </div>
        <div className='grid grid-cols-3 gap-5'>
          {appointments.map((appointment) => (
            <div key={appointment._id} className="flex flex-col justify-center w-[300px] h-[270px] p-6 bg-theme4 rounded-xl shadow-md">
              <div className='flex justify-between items-center mb-1'>
                <h2 className="text-sm font-bold text-gray-900">
                  {appointment.customerId ? appointment.customerId: "ชื่อผู้จอง"}
                </h2>
                <p className="text-sm text-blue-500">{appointment.status}</p>
              </div>
              <div className="mt-4 mb-1">
                <p className="text-sm text-gray-500">บริการ</p>
                <p className="text-base text-gray-900">{appointment.service || "ไม่มีข้อมูลบริการ"}</p>
              </div>
              <div className="mt-4 mb-1 flex justify-between">
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
              <hr className="my-4 " />
              <div className="flex justify-between">
                <button onClick={() => handleConfirm(appointment._id)} className="text-gray-400 text-sm text-green-400">
                  ยืนยัน
                </button>
                <button onClick={() => handleDelete(appointment._id)} className="text-gray-400 text-sm text-red-500">
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
