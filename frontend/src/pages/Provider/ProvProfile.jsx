import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ProvNavBar from "../../components/ProvNavBar";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineThumbUp } from "react-icons/md";
import { TbVirus } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  // Require login
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/user/logged-in", {
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

  // Fetch appointments once user is set
  useEffect(() => {
    if (user) {
      // Fetch the appointments for the provider
      const fetchData = async () => {
        const apiUrl =
          import.meta.env.VITE_API_URL + `/appointment/provider/${user._id}`;
        console.log("API URL:", apiUrl);
        axios
          .get(apiUrl)
          .then((resp) => {
            console.log(resp.data);
            setAppointments(resp.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    }
  }, [user]); // Run the effect when user data is set

  if (!user) {
    return null; // Render nothing if user data hasn't been loaded yet
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-theme4">
      <ProvNavBar />
      <div className="flex w-5/6 mx-auto my-auto 2xl:my-48 border-8 border-theme1">
        {/* Left section: Provider details */}
        <div className="w-1/2 flex flex-col bg-theme3 shadow-md p-6">
          <div className="flex">
            <div className="w-1/3 flex justify-center items-center">
              <img
                src={user.providerDetails.profileImage}
                className="rounded-full w-40 h-40 border-4 border-black"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center space-y-10 space-x-10">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td>
                      <FaRegUser className="inline size-5 mr-2" />
                      <b>ชื่อเล่น :</b>
                    </td>
                    <td>{user.nickname}</td>
                  </tr>
                  <tr>
                    <td>
                      <MdOutlineMail className="inline size-5 mr-2" />
                      <b>Email:</b>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <FiPhone className="inline size-5 mr-2" />
                      <b>Phone:</b>
                    </td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>
                      <FaRegUser className="inline size-5 mr-2" />
                      <b>อายุ:</b>
                    </td>
                    <td>{user.age} ปี</td>
                  </tr>
                  <tr>
                    <td>
                      <MdOutlineThumbUp className="inline size-5 mr-2" />
                      <b>ประสบการณ์:</b>
                    </td>
                    <td>{user.providerDetails.experience} ปี</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h3 className="font-bold">
                  <TbVirus className="inline size-5 mr-2" />
                  โรคที่เชี่ยวชาญ:
                </h3>
                <ul className="list-disc list-inside">
                  {user.providerDetails.specialized_disease.map((disease) => (
                    <li key={disease}>{disease}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold">
                  <IoPricetagsOutline className="inline size-5 mr-2" />
                  ค่าบริการ:
                </h3>
                <p>{user.providerDetails.price_per_day} บาท / วัน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Appointment list */}
        <div className="w-1/2 flex flex-col bg-theme5 shadow-md p-6 overflow-y-scroll max-h-[75vh]">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                className="bg-gray-100 p-4 mb-4 shadow rounded-lg"
                key={appointment._id}
              >
                <p className="text-sm text-gray-500">
                  {new Date(appointment.date.startDate).toLocaleDateString()} -
                  {new Date(appointment.date.endDate).toLocaleDateString()}
                </p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">
                    {appointment.customerId.name}
                  </dd>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">
                    {appointment.customerId.email}
                  </dd>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">
                    {appointment.customerId.phone}
                  </dd>
                </dl>
              </div>
            ))
          ) : (
            <p className="text-xl text-center text-gray-500">
              คุณยังไม่เคยมีการนัดหมาย
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
