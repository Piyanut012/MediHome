import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GrCircleAlert } from "react-icons/gr";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const role = "ลูกค้า";
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);

  const [step, setStep] = useState(1);
  const [error1, setError1] = useState([]);
  const [error2, setError2] = useState([]);

  const navigate = useNavigate();

  const checkUsername = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/check-username",
        { username }
      );
      return response.data.isAvailable;
    } catch (error) {
      console.error("Error checking username availability (frontend):", error);
      return false; // Assume username is not available in case of an error
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/check-email",
        { email }
      );
      return response.data.isAvailable;
    } catch (error) {
      console.error("Error checking email availability (frontend):", error);
      return false; // Assume email is not available in case of an error
    }
  };

  const handleNextClick = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!username || !password1 || !password2) {
      errors.push("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      setError1(errors);
      return;
    }

    const isUsernameAvailable = await checkUsername();
    if (!isUsernameAvailable) {
      errors.push("ชื่อผู้ใช้นี้มีอยู่แล้ว");
    }

    if (username.length < 4) {
      errors.push("ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 4 ตัวอักษร");
    }

    if (password1.length < 8) {
      errors.push("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
    }

    if (password1 !== password2) {
      errors.push("รหัสผ่านไม่ตรงกัน");
    }

    if (errors.length > 0) {
      setError1(errors); // Set all errors at once
      return;
    }

    setStep(2);
    setError1([]);
  };

  const handleBackClick = (e) => {
    e.preventDefault();

    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!name || !email || !phone || !age) {
      errors.push("กรุณากรอกชื่อ อีเมล หมายเลขโทรศัพท์ และอายุ");
      setError2(errors);
      return;
    }

    const isEmailAvailable = await checkEmail();
    if (!isEmailAvailable) {
      errors.push("อีเมลนี้ถูกใช้งานแล้ว");
    }

    if (phone.length != 10) {
      errors.push("หมายเลขโทรศัพท์ต้องมี 10 หลัก");
    }

    if (age <= 0) {
      errors.push("อายุต้องมากกว่า 0");
    }

    if (errors.length > 0) {
      setError2(errors); // Set all errors at once
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        username,
        password2,
        role,
        name,
        nickname,
        email,
        phone,
        age,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Error registering user (frontend):", error);
    }

    setError2([]);
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
              {step === 1 ? "1/2: ลงทะเบียนผู้ใช้" : "2/2: กรอกข้อมูลส่วนตัว"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {step === 1 ? (
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
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="medihome99"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password1"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      รหัสผ่าน
                    </label>
                    <input
                      type="password"
                      name="password1"
                      id="password1"
                      value={password1}
                      placeholder="••••••••"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password2"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      ยืนยันรหัสผ่าน
                    </label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      value={password2}
                      placeholder="••••••••"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  {error1.length > 0 && (
                    <div
                      className="p-4 text-sm text-red-600 rounded-lg bg-red-200 border border-red-400"
                      role="alert"
                    >
                      <ul>
                        {error1.map((err, index) => (
                          <li key={index}>
                            <GrCircleAlert className="inline" /> {err}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      * ชื่อ - นามสกุล
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="เมดิ โฮม"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nickname"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      ชื่อเล่น
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      value={nickname}
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="เมดิ"
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      * อีเมล
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="medi@home.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      * หมายเลขโทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={phone}
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="0801234567"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      * อายุ
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={age}
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  {error2.length > 0 && (
                    <div
                      className="p-4 text-sm text-red-600 rounded-lg bg-red-200 border border-red-400"
                      role="alert"
                    >
                      <ul>
                        {error2.map((err, index) => (
                          <li key={index}>
                            <GrCircleAlert className="inline" /> {err}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
              <hr className="border-black" />
              <div className="flex justify-between space-x-4">
                {step === 2 && (
                  <button
                    onClick={handleBackClick}
                    className="w-1/3 text-theme4 bg-theme1 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    กลับ
                  </button>
                )}
                <button
                  onClick={step === 1 ? handleNextClick : handleSubmit}
                  className={`w-${
                    step === 1 ? "full" : "5/6"
                  } text-theme4 bg-theme1 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  {step === 1 ? "ถัดไป" : "ลงทะเบียน"}
                </button>
              </div>
              <p className="text-sm font-light text-theme1">
                หากคุณมีบัญชีอยู่แล้ว&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-theme1 hover:underline"
                >
                  เข้าสู่ระบบเลย!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
