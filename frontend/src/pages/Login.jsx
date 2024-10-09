import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GrCircleAlert } from "react-icons/gr";
import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL + '/user/login';
      console.log("API URL:", apiUrl);
      try {
        const response = await axios.post(apiUrl, {
          username,
          password,
        });
        console.log(response);
        if (response.data.message === "Login successful") {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const user = response.data.user; // Get the user object from the response
          if (user.role === "ผู้ให้บริการ") {
            navigate("/provider");
            enqueueSnackbar("เข้าสู่ระบบสําเร็จ (ผู้ให้บริการ)", {
              variant: "success",
            });
            setError("");
          } else {
            navigate("/");
            enqueueSnackbar("เข้าสู่ระบบสําเร็จ (ลูกค้า)", { variant: "success" });
            setError("");
          }
        }
      } catch (error) {
        console.log(error);
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    };

    fetchData();
  };

  return (
    <section className="bg-theme4">
      <div className="flex flex-col items-center justify-center py-6 mx-auto my-auto min-h-screen">
        <h1 className="flex items-center mb-6 text-4xl font-extrabold text-theme1">
          MediHome
        </h1>
        <div className="w-5/6 rounded-lg shadow border m-0 md:max-w-md xl:p-0 bg-theme5 border-theme3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-theme1 md:text-2xl">
              เข้าสู่ระบบ
            </h1>
            <form className="space-y-4 md:space-y-6">
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-theme1"
                  >
                    ชื่อผู้ใช้
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    className="mb-4 bg-theme4 border border-theme2 text-gray-700 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                    placeholder="medihome99"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-theme1"
                  >
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="••••••••"
                    className="mb-4 bg-theme4 border border-theme2 text-gray-700 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div
                    className="p-4 text-sm text-red-600 rounded-lg bg-red-200 border border-red-400"
                    role="alert"
                  >
                    <GrCircleAlert className="inline" /> {error}
                  </div>
                )}
              </motion.div>
              <hr className="border-black" />
              <button
                onClick={handleSubmit}
                className="w-full text-theme4 bg-theme1 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-theme2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                เข้าสู่ระบบ
              </button>
              <p className="text-sm font-light text-theme1">
                หากคุณยังไม่มีบัญชีกับเรา&nbsp;
                <Link
                  to="/register"
                  className="font-medium text-theme1 hover:underline"
                >
                  สมัครได้ที่นี่!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
