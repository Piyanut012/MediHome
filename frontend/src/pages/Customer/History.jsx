import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const History = () => {
    const [ appointments, setAppointments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    // test customer_id
    const [customer_id, setCustomer_id] = useState("66fc2a9a0f86be8f9faacf5f");
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL + '/history';
            axios.get(apiUrl)
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);})
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateStr) => {
        const options = { year: '2-digit', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('th-TH', options).format(date);
    };

    return (
        <div className="bg-theme4 font-sans min-h-screen flex-col">
            <NavBar />
            <section className="max-w-5xl mx-auto p-6">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl my-8 text-theme1">Appointments Status</h1>
                        <Link to="/">
                            <OverlayTrigger placement="top" overlay={
                                <Tooltip id="tooltip-top">
                                    จองคิวนัดหมาย
                                </Tooltip>
                            }
                            >
                                <span className="d-inline-flex align-items-center">
                                    <MdOutlineAddBox className="text-green-600 text-4xl" />
                                </span>
                            </OverlayTrigger>
                        </Link>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div>
                            {appointments.length > 0 ? (
                                <table className="w-full border-collapse border-spacing-2 text-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-600 bg-theme1 m-5" style={{ color: "#FFFDF9" }}>No.</th>
                                            <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ผู้ให้บริการ</th>
                                            <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>ราคาทั้งสิ้น</th>
                                            <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>สถานะการจอง</th>
                                            <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันเริ่มต้นการนัดหมาย</th>
                                            <th className="border border-slate-600 bg-theme1" style={{ color: "#FFFDF9" }}>วันสิ้นสุดการนัดหมาย</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((appointment, index) => (
                                            <tr key={appointment._id} className="h-8">
                                                <td className="border border-slate-700 rounded-md text-center">
                                                    {index + 1}.
                                                </td>
                                                <td className="border border-slate-700 rounded-md text-center text-green-500">
                                                    {appointment.providerId.name} ({appointment.providerId.nickname})
                                                </td>
                                                <td className="border border-slate-700 rounded-md text-center">
                                                    {appointment.total_price} -.
                                                </td>
                                                <td className="border border-slate-700 rounded-md text-center">
                                                    {appointment.status}
                                                </td>
                                                <td className="border border-slate-700 rounded-md text-center">
                                                    {formatDate(appointment.date.startDate)}
                                                </td>
                                                <td className="border border-slate-700 rounded-md text-center">
                                                    {formatDate(appointment.date.endDate)}
                                                </td>
                                                <td className="rounded-md text-center mx-5">
                                                    <div className="flex justify-center gap-x-4">
                                                        {appointment.status !== "confirmed" && (
                                                            <div onClick={() => {
                                                                if (window.confirm("คุณต้องการยกเลิกนัดหมายนี้หรือไม่?")) {
                                                                    const apiUrl = `${import.meta.env.VITE_API_URL}/history/delete/${appointment._id}`;
                                                                    axios.delete(apiUrl)
                                                                        .then((response) => {
                                                                            setAppointments(response.data);
                                                                            console.log(response.data);
                                                                            setLoading(false);
                                                                        })
                                                                        .catch((error) => {
                                                                            console.log(error);
                                                                            setLoading(false);
                                                                        });
                                                                }
                                                            }}>
                                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
