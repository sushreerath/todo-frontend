import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from 'react-hot-toast';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // for redirect

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password , username };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message || "Registration successful!");
      navigate('/login'); // redirect to login page after successful registration
     
      console.log(res.data);// TODO: Add navigation or toast/notification here as needed
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed! Please try again.");
      console.error(error);
      // TODO: Add error feedback for users here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="border border-gray-300 rounded-lg p-6 w-96 shadow-lg bg-white">
        <div className="flex justify-center mb-8">
          <i className="fa-solid fa-circle-user fa-4x" />
        </div>
        <form onSubmit={registerHandler}>
          <div className="mb-3">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <p className="mb-3">
              Already User? Please{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
