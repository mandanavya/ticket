import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage for session persistence
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user))
        // Navigate to home page
        navigate("/events");
      } else {
        setErrorMessage(result.error || "Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-[#D9EAFD]">
      {/* Left Section */}
      <div className="text-center md:w-1/2 mb-6 md:mb-0 m-6">
        <h1 className="text-6xl font-bold text-gray-800">Login to your account!</h1>
        <p className="text-lg p-4">Welcome Back!</p>
      </div>

      {/* Right Section */}
      <div className="bg-[#F8FAFC] shadow-lg p-6 rounded-lg w-full max-w-md md:w-1/2">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              name="loginEmail"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password:</label>
            <input
              type="password"
              name="loginPassword"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

          <button
            type="submit"
            className="relative w-full border border-white rounded-[2%] p-3 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out 
                        before:absolute before:inset-0 before:right-0 before:bg-green-300 before:w-0 before:transition-all before:duration-300 before:ease-in-out 
                        hover:before:w-full hover:text-black before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"
          >
            <span className="relative z-10 transition-colors duration-0 ease-in-out">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;