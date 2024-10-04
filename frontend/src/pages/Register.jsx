import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);

  const [step, setStep] = useState(1);

  const handleNextClick = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    
  };

  return (
    <section class="bg-fourth">
      <div class="flex flex-col items-center justify-center py-6 mx-auto my-auto min-h-screen">
        <h1 class="flex items-center mb-3 text-3xl font-bold text-first">
          MediHome
        </h1>
        <div class="w-5/6 rounded-lg shadow border m-0 md:max-w-md xl:p-0 bg-fifth border-third">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-first md:text-2xl">
              {step === 1 ? "Register an account" : "Complete your profile"}
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" method="post">
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
                      for="username"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      placeholder="medihome99"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password1"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Password
                    </label>
                    <input
                      type="password1"
                      name="password1"
                      id="password1"
                      placeholder="••••••••"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password2"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password2"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      required=""
                    />
                  </div>
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
                      for="email"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      placeholder="medi@home.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      placeholder="Medi Home"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      placeholder="0801234567"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="age"
                      class="block mb-2 text-sm font-medium text-first"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      class="mb-4 bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                      placeholder="0"
                      required=""
                    />
                  </div>
                </motion.div>
              )}
              <hr class="border-black" />
              <div class="flex justify-between space-x-4">
                {step === 2 && (
                  <button
                    onClick={handleBackClick}
                    className="w-1/3 text-fourth bg-first hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={step === 1 ? handleNextClick : handleSubmit }
                  className={`w-${
                    step === 1 ? "full" : "5/6"
                  } text-fourth bg-first hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  {step === 1 ? "Next" : "Register"}
                </button>
              </div>
              <p class="text-sm font-light text-first">
                Already have an account?&nbsp;
                <a href="/login" class="font-medium text-first hover:underline">
                  Log in here!
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
