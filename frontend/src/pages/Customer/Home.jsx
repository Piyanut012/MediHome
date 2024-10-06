import React, { useRef, useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import 'flowbite';
import './DatePicker.css';

const Home = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams(); // รับค่า id จาก URL
  const [value, setValue] = useState(1000);
  const [selectedDisease, setSelectedDisease] = useState([]); // State for selected diseases
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [selectedProvider, setSelectedProvider] = useState(null);

  const datepickerRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
        const apiUrl = import.meta.env.VITE_API_URL + '/user/providers';
        console.log("API URL:", apiUrl);
        axios.get(apiUrl).then((resp) => {
          console.log(resp.data);
          setProviders(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    // Initialize Flatpickr
    flatpickr("#datepicker-actions", {
      minDate: "today", // Set the minimum date to today
      locale: "th", // Use the Thai locale
      dateFormat: "Y-m-d", // Set the date format
      onChange: (selectedDate) => {
        setSelectedDate(selectedDate[0]); // Update state with selected date
      },
    });
    
    fetchData();
  }, []);

  useEffect(() => {
    if (datepickerRef.current) {
      // Initialize Flatpickr only if the ref is available
      const availability = selectedProvider?.providerDetails?.availability || [];

      // แปลง availability ให้อยู่ในรูปแบบที่ enable ใช้งานได้
      const enable_dates = availability.map(({ startDate, endDate }) => ({
        from: new Date(startDate).toISOString().split('T')[0], // แปลงเป็น YYYY-MM-DD
        to: new Date(endDate).toISOString().split('T')[0]      // แปลงเป็น YYYY-MM-DD
      }));

      flatpickr(datepickerRef.current, {
        inline: true,
        mode: "range",
        enable: enable_dates,
        locale: "th",
        dateFormat: "Y-m-d",
        onChange: function (selectedDates) {
          if (selectedDates.length === 2) {
            // ตรวจสอบว่ามีวันที่เลือก 2 วันหรือไม่
            const [startDate, endDate] = selectedDates;
            const formattedStartDate = startDate.toLocaleDateString('th-TH', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const formattedEndDate = endDate.toLocaleDateString('th-TH', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            setSelectedDates([formattedStartDate, formattedEndDate]); // อัปเดต state ของ selectedDates
          } else {
            setSelectedDates([]); // เคลียร์วันที่หากไม่เลือก 2 วัน
          }
        }
      });
    }
  }, [selectedProvider]); // Initialize Flatpickr when selectedProvider changes

  const handleDiseaseChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDisease((prev) =>
      checked ? [...prev, value] : prev.filter((disease) => disease !== value)
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
  
    // ตรวจสอบการเลือกข้อมูลและแปลงวันที่
    const formattedDate = selectedDate
      ? selectedDate.toISOString().slice(0, 10)
      : null;
  
    // สร้างพารามิเตอร์ที่จะส่งไปยัง API
    const params = {};
    if (selectedDisease.length > 0) params.diseases = selectedDisease.join(",");
    if (formattedDate) params.date = formattedDate;
    if (value) params.price = value;
  
    // เรียกใช้ API พร้อมพารามิเตอร์ที่มี
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/user/providers/filter`;
      const response = await axios.get(apiUrl, { params });
      setProviders(response.data); // อัปเดตผลลัพธ์
    } catch (error) {
      console.error("Error fetching filtered providers:", error);
    }
  };

  const handleBookClick = (provider) => {
    console.log('Selected provider:', provider);
    setSelectedProvider(provider); // Set the selected provider
  };

  const handleCloseModal = () => {
    setSelectedDates([]); // เคลียร์วันที่ที่เลือก
    setSelectedProvider(null); // ตั้งค่า selectedProvider เป็น null เพื่อปิด modal
  };
  
  return (
    <div className="bg-theme4 font-sans min-h-screen flex-col">
      <NavBar />
      <section className="max-w-5xl mx-auto p-6">
        <form onSubmit={handleFilterSubmit}>
        {/* Filter */}
          <div className="grid md:grid-cols-2 md:gap-4 gap-2">
            <div className="flex justify-center items-center">
              {/* Dropdown search disease button */}
              <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" 
                className="inline-flex items-center w-3/8 h-4/5 px-4 py-2 text-2xl font-medium text-center text-white bg-theme1 bg-opacity-75 rounded-lg hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">ประเภทโรค<svg class="w-2.5 h-2.5 ms-10 mt-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              {/* Dropdown disease */}
              <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow w-72 dark:bg-gray-700">
                  <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                    {["ความดันโลหิตสูง", "เบาหวาน", "หัวใจและหลอดเลือด", "หลอดเลือดสมอง", "สมองเสื่อม/อัลไซเมอร์", "มะเร็ง", "ข้อเข่าเสื่อม", "กระดูกพรุน", "ปอดเรื้อรัง", "ไต", "อัมพฤกษ์/อัมพาต"].map((disease) => (
                    <li key={disease}>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id={`checkbox-${disease}`}
                          type="checkbox"
                          value={disease}
                          onChange={handleDiseaseChange}
                          className="w-4 h-4 text-theme1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-500"
                        />
                        <label htmlFor={`checkbox-${disease}`} className="w-full ms-4 text-xl font-medium text-gray-900 rounded dark:text-gray-300">
                          {disease}
                        </label>
                      </div>
                    </li>
                  ))}
                  </ul>
              </div>
            </div>
            {/* Select Date */}
            <div className="flex justify-center items-center">
              <div className="relative z-0 w-4/6">
              <input 
                id="datepicker-actions" 
                type="text" // Use text type to work with Flatpickr
                value={selectedDate ? selectedDate.toLocaleDateString('th-TH') : ''} // Format for Thai display
                className="bg-white bg-opacity-75 border-b-4 border-b-theme1 border-t-0 border-r-0 border-s-0 text-theme1 text-2xl block ps-2 placeholder-theme1" 
                placeholder="เลือกวัน"
              />
              </div>
            </div>
            {/* Range Pirce Filter */}
            <div className="relative mb-6">
              <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
              {/* Display the value */}
              <div className="text-center mb-2">
                  <span className="text-lg font-medium text-theme1 dark:text-gray-300">
                      ราคา: {value} บาท
                  </span>
              </div>
              <input 
                  id="labels-range-input" 
                  type="range" 
                  value={value} 
                  min="500" 
                  max="2000" 
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-0 -bottom-6">ต่ำสุด 500</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-1/3 transform -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">1000</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-2/3 transform -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">1500</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute right-0 -bottom-6">สูงสุด 2000</span>
          </div>
        </div>
        {/* Filter button */}
        <div className="flex justify-between items-center m-5 p-4 border-b-2 border-theme1">
          <button class="bg-theme1 bg-opacity-75 text-2xl text-white font-bold py-2 px-20 ml-auto rounded-3xl hover:bg-theme1 hover:bg-opacity-100" >กรอง</button>
        </div>
        </form>
        
        {/* Booking Providers */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-5">ผู้ให้บริการ</h1>
        {/* Check if loading */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-3 md:gap-4">
            {/* Render Provider Cards */}
            {providers.length > 0 ? (
              providers.map((provider) => (
                <div
                  key={provider._id} // Assuming each provider has a unique ID
                  className="flex flex-col h-full justify-between bg-white rounded-lg shadow-xl"
                >
                  <img
                    src={provider.providerDetails.profileImage|| "https://via.placeholder.com/150"}
                    alt={provider.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="flex-grow p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-green-700 font-bold text-xl">
                        {provider.name} ({provider.nickname})
                      </h3>
                      {/* <h3 className="text-green-700 font-bold text-base">
                        0 เคส
                      </h3> */}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-green-600 text-sm mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-80 mr-2"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <span>อายุ {provider.age} ปี</span>
                      </div>
                      <div className="flex items-center text-green-600 text-sm mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-briefcase-medical opacity-80 mr-2"
                        >
                          <path d="M12 11v4" />
                          <path d="M14 13h-4" />
                          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                          <path d="M18 6v14" />
                          <path d="M6 6v14" />
                          <rect width="20" height="14" x="2" y="6" rx="2" />
                        </svg>
                        <span>ประสบการณ์ {provider.providerDetails.experience} ปี</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-green-600 text-sm">โรคที่เชี่ยวชาญ</span>
                      <div className="flex flex-wrap gap-2 mt-2 max-h-16 overflow-y-auto">
                        {provider.providerDetails.specialized_disease.map((disease, index) => (
                          <span
                            key={index}
                            className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs"
                          >
                            {disease}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 pt-0">
                    <span className="text-green-700 font-bold text-xl">
                      ฿{provider.providerDetails.price_per_day} ต่อวัน
                    </span>
                    <button
                      onClick={() => handleBookClick(provider)} // Pass the selected provider to the handler
                      // data-modal-target="default-modal"
                      // data-modal-toggle="default-modal"
                      className="bg-green-600 text-white text-xl px-4 py-1 rounded-lg w-1/3"
                    >
                      จอง
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-green-600">ไม่พบผู้ให้บริการ</div>
            )}
          </div>
        )}
      </section>
      
      {/* Booking Modal */}
      {selectedProvider && ( // Render the modal only if a provider is selected
        <div id="default-modal" className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 flex">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-green-700 text-2xl font-bold">
                  เลือกวันที่ต้องการจอง
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="grid md:grid-cols-2 md:gap-4 text-gray-400 mb-4">
                <div ref={datepickerRef} id="datepicker-inline" className="hidden"></div>
                <div className="p-3">
                  <div className="flex flex-col mt-3">
                    <h3 className="text-black font-bold text-lg">ยอดชำระเงินทั้งหมด</h3>
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                      <h3 className="text-green-700 font-bold text-xl mb-2">
                        ฿{selectedProvider.providerDetails.price_per_day * (selectedDates.length ? 1 : 0)}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {selectedDates.length === 2 ? (
                          <span>
                            <span className="font-medium">ระหว่างวันที่:</span> {selectedDates[0]} ถึง {selectedDates[1]}
                          </span>
                        ) : (
                          <span className="text-red-500">กรุณาเลือกวันที่</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" className="ml-auto text-white bg-theme1 bg-opacity-75 hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Home;

