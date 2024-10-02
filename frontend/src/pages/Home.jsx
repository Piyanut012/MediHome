import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div>
      <h1 className="text-red-500 text-4xl mb-2">Test Show User</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.role})</li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
