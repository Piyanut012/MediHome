import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import 'flowbite';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams(); // รับค่า id จาก URL

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
      <section class="max-w-5xl mx-auto p-6">
        <div class=" p-4 flex justify-between items-center border-b-2 border-secondary">
          
          {/* Dropdown button */}
          <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
          </button>
          {/* Dropdown menu */}
          <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
              <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  </div>
                  <input type="text" id="input-group-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
                </div>
              </div>
              <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input checked id="checkbox-item-12" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="checkbox-item-12" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                    </div>
                </li>
              </ul>
              <a href="#" class="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
              </svg>
                Delete user
            </a>
          </div>
        
        </div>

        <h2 class="text-4xl font-bold text-accent mb-4">ตารางคลาส</h2>
        <h1 className="text-theme1 text-4xl mb-2">Test Show</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} ({user.role})</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home;
