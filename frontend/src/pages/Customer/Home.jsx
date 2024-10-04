import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import 'flowbite';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams(); // รับค่า id จาก URL
  const [value, setValue] = useState(1000);

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

    fetchData();
  }, []);

  return (
    <div className="bg-theme4 font-sans min-h-screen flex-col">
      <NavBar />
      <section className="max-w-5xl mx-auto p-6">
        {/* Filter */}
        {/* <div class=" p-4 flex justify-between items-center border-b-2 border-secondary"> */}
          <div className="grid md:grid-cols-2 md:gap-4 h-40">
            <div className="flex justify-between items-center">
              {/* Dropdown search disease button */}
              <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="inline-flex items-center w-3/8 h-4/5 px-4 py-2 text-2xl font-medium text-center text-white bg-theme1 bg-opacity-75 rounded-lg hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">ประเภทโรค<svg class="w-2.5 h-2.5 ms-10 mt-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              {/* Dropdown disease */}
              <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow w-72 dark:bg-gray-700">
                  <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-theme1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="checkbox-item-11" className="w-full ms-4 text-xl font-medium text-gray-900 rounded dark:text-gray-300">โรคเบาหวาน</label>
                      </div>
                    </li>
                    {/* Repeat if you want */}
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-theme1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="checkbox-item-11" className="w-full ms-4 text-xl font-medium text-gray-900 rounded dark:text-gray-300">โรคเบาหวาน</label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-theme1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="checkbox-item-11" className="w-full ms-4 text-xl font-medium text-gray-900 rounded dark:text-gray-300">โรคเบาหวาน</label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-theme1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="checkbox-item-11" className="w-full ms-4 text-xl font-medium text-gray-900 rounded dark:text-gray-300">โรคเบาหวาน</label>
                      </div>
                    </li>
                  </ul>
                  {/* <a href="#" className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
                  </svg>
                    Delete user
                </a> */}
              </div>
            </div>
            {/* Select Date */}
            <div className="flex justify-between items-center">
              <div className="relative w-4/6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-6 h-6 text-theme1 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
                <input id="datepicker-actions" datepicker="true" datepicker-buttons="true" datepicker-autoselect-today="true" datepicker-min-date="today" datepicker-language="TH" type="text" 
                className="bg-white bg-opacity-75 border-b-4 border-b-theme1 border-t-0 border-r-0 border-s-0 text-theme1 text-2xl focus:ring-theme1 focus:border-theme1 block w-full ps-14 placeholder-theme1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-theme1 dark:focus:border-theme1" 
                placeholder="เลือกวัน"/>
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
        <div className="flex justify-between items-center m-5">
          <button class="bg-theme1 bg-opacity-75 text-2xl text-white font-bold py-2 px-20 ml-auto rounded-3xl hover:bg-theme1 hover:bg-opacity-100" >กรอง</button>
        </div>
      
      </section>
    </div>
  )
}

export default Home;
