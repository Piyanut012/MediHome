import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Login = () => {
  return (
    <section class="bg-fourth">
      <div class="flex flex-col items-center justify-center py-6 mx-auto my-auto min-h-screen">
        <h1 class="flex items-center mb-3 text-3xl font-bold text-first">
          MediHome
        </h1>
        <div class="w-5/6 rounded-lg shadow border m-0 md:max-w-md xl:p-0 bg-fifth border-third">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-first md:text-2xl">
              Log in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" method="post">
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
                  class="bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                  placeholder="username"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-first"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-fourth border border-second text-gray-700 rounded-lg focus:ring-second focus:border-second block w-full p-2.5"
                  required=""
                />
              </div>
              <hr class="border-black" />
              <button
                type="submit"
                class="w-full text-fourth bg-first hover:bg-second focus:ring-4 focus:outline-none focus:ring-second font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>
              <p class="text-sm font-light text-first">
                Don't have an account with us?&nbsp;
                <a href="#" class="font-medium text-first hover:underline">
                  Register here!
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
