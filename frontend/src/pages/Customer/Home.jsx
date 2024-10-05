import React, { useRef, useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import 'flowbite';
import './DatePicker.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams(); // รับค่า id จาก URL
  const [value, setValue] = useState(1000);
  const [selectedDisease, setSelectedDisease] = useState([]); // State for selected diseases
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  const datepickerRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
        const apiUrl = import.meta.env.VITE_API_URL + '/user';
        console.log("API URL:", apiUrl);
        axios.get(apiUrl).then((resp) => {
          console.log(resp.data);
          setUsers(resp.data);
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
      }});
    
    if (window.flatpickr) {
      window.flatpickr(datepickerRef.current, {
        inline: true,
        minDate: "2024-10-05",
        maxDate: "2024-11-20",
        mode: "multiple",
        enable: [
          "2024-10-05", "2024-10-06", "2024-10-09", "2024-10-11", "2024-10-12", "2024-10-13", "2024-10-14", "2024-10-15", "2024-10-16", "2024-10-17", "2024-10-18", "2024-10-19", "2024-11-20"
        ],
        locale: "th",
        dateFormat: "Y-m-d",
        onChange: function (selectedDates) {
          const formattedDates = selectedDates.map(date =>
            date.toLocaleDateString('th-TH', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          );
          setSelectedDates(formattedDates);
        }
      })};

    fetchData();
  }, []);

  const handleDiseaseChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDisease((prev) =>
      checked ? [...prev, value] : prev.filter((disease) => disease !== value)
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Diseases:", selectedDisease);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Price:", value);
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
                    {["โรคเบาหวาน", "โรคหัวใจ", "โรคไต", "โรคตกหลุมรัก", "โรคที่ไม่มีเธอ"].map((disease) => (
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
        
        {/* Booking Services */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-5">บริการ</h1>
        <div className="grid md:grid-cols-3 md:gap-4">

          {/* Service Card */}
          <div className="flex flex-col h-full justify-between bg-white rounded-lg shadow-xl">
            <img src="https://images.squarespace-cdn.com/content/v1/62946d69b7bbaa222ea1c0e1/27d5517b-fe13-4ca0-8f9e-a45654037f04/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E.jpg" alt="Service" class="w-full h-48 object-cover rounded-t-lg"/>
            <div class="flex-grow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-green-700 font-bold text-xl">รุ่งจิต มีชัย (อ้อม)</h3>
                <h3 className="text-green-700 font-bold text-base">125 เคส</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-600 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-80 mr-2">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <span>อายุ 34 ปี</span>
                </div>
                <div className="flex items-center text-green-600 text-sm mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-briefcase-medical opacity-80 mr-2">
                    <path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/>
                  </svg>
                  <span>ประสบการณ์ 3 ปี</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 text-sm">โรคที่เชี่ยวชาญ</span>
                <div className="flex flex-wrap gap-2 mt-2 max-h-16 overflow-y-auto">
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">เบาหวาน</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ไต</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">หลอดเลือดสมอง</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                  <span className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-xs">ปอดอักเสบ</span>
                </div>
              </div>
             </div>
              <div className="flex justify-between items-center p-4 pt-0">
                <span className="text-green-700 font-bold text-xl">฿999 ต่อวัน</span>
                <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="bg-green-600 text-white text-xl px-4 py-1 rounded-lg w-1/3">จอง</button>
              </div>
          </div>
          {/* Repeat if you want */}
          
        </div>
      </section>

      {/* Booking Modal */}
      <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            {/* <Modal content */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-green-700 text-2xl font-bold text-gray-90">
                        เลือกวันที่ต้องการจอง
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <div class="grid md:grid-cols-2 md:gap-4 text-gray-400 mb-4">
                  {/* <div id="datepicker-inline" class="hidden"></div> */}
                  <div ref={datepickerRef} id="datepicker-inline" className="hidden"></div>
                  <div class="p-3">
                    <div class="flex flex-col mt-3">
                      <h3 className="text-black font-bold text-lg">ยอดชำระเงินทั้งหมด</h3>
                      <h3 className="text-green-700 font-bold text-xl">฿1998 ({selectedDates.length} วัน)</h3>
                    </div>
                  </div>
                </div>

                {/* Modal footer */}
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="default-modal" type="button" class="ml-auto text-white bg-theme1 bg-opacity-75 hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ยืนยัน</button>
                    <button data-modal-hide="default-modal" type="button" class="ml-auto py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:ring-4 focus:ring-gray-100">ยกเลิก</button>
                </div>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;

