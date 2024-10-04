import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);

  const [step, setStep] = useState(1);
  const [error, setError] = useState([]);

  const handleNextClick = (e) => {
    e.preventDefault();

    const errors = [];

    if (username.length < 4) {
      errors.push("Username must be at least 4 characters long.");
    }

    if (password1.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (password1 !== password2) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setError(errors); // Set all errors at once
      return;
    }

    setStep(2);
    setError([]);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5173/register", {
        name,
        email,
        username,
        password2,
        phone,
        age,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-theme4">
      <div className="flex flex-col items-center justify-center py-6 mx-auto my-auto min-h-screen">
        <h1 className="flex items-center mb-3 text-3xl font-bold text-theme1">
          MediHome
        </h1>
        <div className="w-5/6 rounded-lg shadow border m-0 md:max-w-md xl:p-0 bg-theme5 border-theme3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-theme1 md:text-2xl">
              {step === 1 ? "Register an account" : "Complete your profile"}
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
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
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
                      Password
                    </label>
                    <input
                      type="password"
                      name="password1"
                      id="password1"
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
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  {error.length > 0 && (
                    <div
                      className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-200 border border-red-400"
                      role="alert"
                    >
                      <ul>
                        {error.map((err, index) => (
                          <li key={index}>
                            <b>!</b>&nbsp; {err}
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
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="medi@home.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="Medi Home"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-theme1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
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
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      className="mb-4 bg-theme4 border border-theme2 text-gray-900 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                      placeholder="0"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
              <hr className="border-black" />
              <div className="flex justify-between space-x-4">
                {step === 2 && (
                  <button
                    onClick={handleBackClick}
                    className="w-1/3 text-theme4 bg-theme1 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={step === 1 ? handleNextClick : handleSubmit}
                  className={`w-${
                    step === 1 ? "full" : "5/6"
                  } text-theme4 bg-theme1 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  {step === 1 ? "Next" : "Register"}
                </button>
              </div>
              <p className="text-sm font-light text-theme1">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-theme1 hover:underline"
                >
                  Log in here!
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
