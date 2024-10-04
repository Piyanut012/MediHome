import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from "../../components/NavBar";

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
      <h1 className="text-theme1 text-4xl mb-2">Test Show</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}, {user.email} {user.name} ({user.role})</li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
