import {React, useState, useEffect} from "react";
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage() {
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
      );
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.email;
      setToken(accessToken);
      setUser(user);
      localStorage.setItem("token",accessToken);
      localStorage.setItem("userEmail", user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err)
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center h-screen dark:bg-gray-800">
      <div className="flex flex-col justify-center max-w-md mx-auto w-full p-5 h-1/2 bg-green-200  dark:bg-gray-700 rounded-2xl shadow-md">
      <form onSubmit={handleSubmit} className=" flex flex-col justify-center w-full">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center">
          <img
            src="/health-track-logo-med.png"
            className="sm:h-20 sm:w-20 h-10 w-10 me-3"
            alt="TakeCare Logo"
          />
          <span className="self-center font-extralight text-4xl whitespace-nowrap text-green-500 dark:text-white">
            TakeCARE
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-green-500 dark:text-white">
          Log In
        </h2>
        <div className="relative z-0 w-full mb-5 group p-55">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="text-white w-full bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <p className="text-center mt-4 text-black dark:text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
        </div>
    </div>
  );
}

export default LoginPage;
