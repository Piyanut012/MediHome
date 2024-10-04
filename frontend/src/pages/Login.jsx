import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted");
    
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
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" method="post">
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
                    className="mb-4 bg-theme4 border border-theme2 text-gray-700 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                    placeholder="medihome99"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-theme1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-theme4 border border-theme2 text-gray-700 rounded-lg focus:ring-theme2 focus:border-theme2 block w-full p-2.5"
                    required=""
                  />
                </div>
              </motion.div>
              <hr className="border-black" />
              <button
                type="submit"
                className="w-full text-theme4 bg-theme1 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-theme2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>
              <p className="text-sm font-light text-theme1">
                Don't have an account with us?&nbsp;
                <Link
                  to="/register"
                  className="font-medium text-theme1 hover:underline"
                >
                  Register here!
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
