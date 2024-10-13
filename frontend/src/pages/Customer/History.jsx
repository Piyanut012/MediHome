import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import CusNavBar from "../../components/CusNavBar";
import Loading from "../../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSnackbar } from 'notistack';

const History = () => {
    const [user, setUser] = useState(null);
    const [ appointments, setAppointments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // test customer_id
    const [customer_id, setCustomer_id] = useState("66fc2a9a0f86be8f9faacf5f");

    // Load user data
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
        const apiUrl = import.meta.env.VITE_API_URL + `/history/${user._id}`;
            axios.get(apiUrl)
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);})
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const formatDate = (dateStr) => {
        const options = { year: '2-digit', month: 'long', day: '2-digit' };
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('th-TH', options).format(date);
    };

    return (
        <div className="bg-theme4 font-sans min-h-screen flex-col">
            <CusNavBar />
            <section className="max-w-5xl mx-auto p-6">
                <div className="p-1">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-8 text-theme1">ประวัติการจอง</h1>
                    
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div>
  {appointments.length > 0 ? (
    <div className="flex flex-col gap-8">
      
      <>
      {/* ตารางสถานะ Pending */}
      {appointments.filter((appointment) => appointment.status === 'pending').length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">รอดำเนินการ</h2>
          <table className="w-full border-collapse border-spacing-2 text-center shadow-lg">
            <thead>
              <tr>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>No.</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ผู้ให้บริการ</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ราคาทั้งสิ้น</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>สถานะการจอง</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันเริ่มต้นการนัดหมาย</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันสิ้นสุดการนัดหมาย</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ยกเลิก</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((appointment) => appointment.status === 'pending')
                .map((appointment, index) => (
                  <tr key={appointment._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">{index + 1}.</td>
                    <td className="border border-slate-700 rounded-md text-center text-green-500">
                      {appointment.providerId.name} ({appointment.providerId.nickname})
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{appointment.total_price} -.</td>
                    <td className="border border-slate-700 rounded-md text-center bg-yellow-100 text-yellow-700">
                      {appointment.status}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.startDate)}</td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.endDate)}</td>
                    <td className="rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <div
                          onClick={() => {
                            if (window.confirm("คุณต้องการยกเลิกนัดหมายนี้หรือไม่?")) {
                              const apiUrl = `${import.meta.env.VITE_API_URL}/history/delete/${appointment._id}`;
                              axios.delete(apiUrl)
                                .then((response) => {
                                  enqueueSnackbar("ยกเลิกการจองสำเร็จ", { variant: "error" });
                                  fetchData(); // เรียกข้อมูลใหม่หลังจากลบเสร็จ
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }
                          }}
                        >
                          <MdOutlineDelete className="text-2xl text-red-600 cursor-pointer" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ตารางสถานะ Confirmed */}
      {appointments.filter((appointment) => appointment.status === 'confirmed').length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ยืนยันแล้ว</h2>
          <table className="w-full border-collapse border-spacing-2 text-center shadow-lg">
            <thead>
              <tr>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>No.</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ผู้ให้บริการ</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ราคาทั้งสิ้น</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>สถานะการจอง</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันเริ่มต้นการนัดหมาย</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันสิ้นสุดการนัดหมาย</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((appointment) => appointment.status === 'confirmed')
                .map((appointment, index) => (
                  <tr key={appointment._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">{index + 1}.</td>
                    <td className="border border-slate-700 rounded-md text-center text-green-500">
                      {appointment.providerId.name} ({appointment.providerId.nickname})
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{appointment.total_price} -.</td>
                    <td className="border border-slate-700 rounded-md text-center bg-green-100 text-green-700">
                      {appointment.status}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.startDate)}</td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.endDate)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ตารางสถานะ Canceled */}
      {appointments.filter((appointment) => appointment.status === 'canceled').length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ยกเลิกแล้ว</h2>
          <table className="w-full border-collapse border-spacing-2 text-center shadow-lg">
            <thead>
              <tr>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>No.</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ผู้ให้บริการ</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ราคาทั้งสิ้น</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>สถานะการจอง</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันเริ่มต้นการนัดหมาย</th>
                <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันสิ้นสุดการนัดหมาย</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((appointment) => appointment.status === 'canceled')
                .map((appointment, index) => (
                  <tr key={appointment._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">{index + 1}.</td>
                    <td className="border border-slate-700 rounded-md text-center text-green-500">
                      {appointment.providerId.name} ({appointment.providerId.nickname})
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{appointment.total_price} -.</td>
                    <td className="border border-slate-700 rounded-md text-center bg-red-100 text-red-700">
                      {appointment.status}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.startDate)}</td>
                    <td className="border border-slate-700 rounded-md text-center">{formatDate(appointment.date.endDate)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
    </div>
  ) : (
    <div className="text-theme1 font-semibold text-center">
      คุณยังไม่มีนัดหมายในปัจจุบัน คุณสามารถทำ<a href="/" className="text-blue-500">การจองได้ที่นี่</a>
    </div>
  )}
</div>

                    )}
                </div>
            </section>
        </div>
    )
}

export default History;
