import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from 'react-hot-toast';
import { getErrorMessage } from "../../Utils/ErrorMessage"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // for redirect


 const loginHandler = async (e) => {
  e.preventDefault();
  try {
    const data = { email, password };
    const res = await AuthServices.loginUser(data);

    // Save token and user to localStorage
    localStorage.setItem("todoapp", JSON.stringify({
      token: res.data.token,
      user: res.data.user,
    }));

    toast.success(res.data.message || "Login successful!");
    navigate('/home'); // redirect to home page

    console.log("Login Response:", res.data);
  } catch (err) {
    toast.error(getErrorMessage(err));
    console.error(err);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="border border-gray-300 rounded-lg p-6 w-96 shadow-lg bg-white">
        <div className="flex justify-center mb-8">
          <i className="fa-solid fa-circle-user fa-4x" />
        </div>
        <form onSubmit={loginHandler}>
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
              Not a User? Please{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
