import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateRangePicker } from 'rsuite';
import ProvNavBar from "../../components/ProvNavBar";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function HomePro() {
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [avail, setAvail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    const apiUrl = import.meta.env.VITE_API_URL + `/user/avail/${user._id}`;
    console.log("API URL:", apiUrl); 
    try {
      const resp = await axios.get(apiUrl);
      setAvail(resp.data.availability || []); 
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }}
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (index) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) return;

    const availabilityToDelete = avail[index];
    const apiUrl = `${import.meta.env.VITE_API_URL}/user/avail/${availabilityToDelete._id}`;

    try {
      await axios.delete(apiUrl);
      setAvail((prevAvail) => prevAvail.filter((_, i) => i !== index));
      enqueueSnackbar("ลบข้อมูลสำเร็จ", { variant: "success" });
    } catch (err) {
      setError(err.response ? err.response.data.message : "เกิดข้อผิดพลาดในการลบ");
    }
  };

  const handleAddAvailability = async () => {
    if (startDate && endDate) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/user/avail/${user._id}`;
      console.log("API URL:", apiUrl);
      try {
        const response = await axios.post(apiUrl, {
          startDate: startDate,
          endDate: endDate
        });
        setAvail((prevAvail) => [...prevAvail, response.data.availability]);
        setStartDate(null);
        setEndDate(null);
        setError('');
        enqueueSnackbar("เพิ่มช่วงเวลาว่างสำเร็จ", { variant: "success" });
      } catch (err) {
        setError(err.response ? err.response.data.message : "เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      }
    } else {
      setError("กรุณาเลือกช่วงวันที่ก่อน");
    }
  };

  const formatDateToThai = (date) => {
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <ProvNavBar />
      <div className='flex flex-col justify-center items-center my-16 px-80'>
        <p>เพิ่มช่วงเวลาที่ว่าง</p>
        <div>
          <DateRangePicker
            onChange={(value) => {
              if (value && value.length === 2)
                {
                setStartDate(value[0]);
                setEndDate(value[1]);
              }
            }}
            disabledDate={(date) => {
              const today = new Date(); 
              const isPastDate = date < today.setHours(0, 0, 0, 0); 

              // เช็คว่ามีวันที่ใน availability แล้วหรือไม่
              const isUnavailable = avail.some((availability) => {
                const start = new Date(availability.startDate);
                const end = new Date(availability.endDate);
                return date >= start && date <= end;
              });

              return isPastDate || isUnavailable; 
            }}
            renderCell={(date) => {
              // เช็คว่ามีวันที่ใน availability หรือไม่
              const isUnavailable = avail.some((availability) => {
                const start = new Date(availability.startDate);
                const end = new Date(availability.endDate);
                return date >= start && date <= end;
              });

            }}
          />

          <button
            className="bg-theme1 text-sm ml-2 text-center text-white px-2 py-1 h-[40px] w-[70px] rounded hover:bg-theme3 hover:text-black transition duration-200 mt-4"
            onClick={handleAddAvailability}
          >
            เพิ่ม
          </button>
          {startDate && endDate && (
            <p className='p-4'>{`ช่วงวันที่เลือก: ${formatDateToThai(startDate)} ถึง ${formatDateToThai(endDate)}`}</p>
          )}
        </div>
        <div>
          <p>ช่วงเวลาว่างทั้งหมด</p>
          <hr className='m-3' />
          {error && <p className="text-red-500">{error}</p>}
          <div className='grid grid-cols-2 items-center gap-x-2'>
            {loading ? (
              <p>กำลังโหลด...</p>
            ) : (
              avail.length > 0 ? (
                avail.map((availability, index) => (
                  <div key={availability._id} className='w-96 flex justify-between items-center p-5 text-sm rounded-2xl mb-3 shadow-md hover:shadow-lg transition-shadow duration-200'>
                    <div>
                      <p className='font-medium text-base'>{`เริ่มต้น: ${formatDateToThai(availability.startDate)}`}</p>
                      <p>{`สิ้นสุด: ${formatDateToThai(availability.endDate)}`}</p>
                    </div>
                    <div className='flex justify-end mt-2'>
                      <button
                        className="bg-red-500 text-sm text-center text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => handleDelete(index)}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>ไม่พบข้อมูล availability</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePro;
