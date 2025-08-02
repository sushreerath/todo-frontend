import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ; // or correct port

const loginUser = (data) => {
  return axios.post(`${API_BASE_URL}/user/login`, data);
};

const registerUser = (data) => {
  return axios.post(`${API_BASE_URL}/user/register`, data);
};


const AuthServices = { registerUser, loginUser };
export default AuthServices;
