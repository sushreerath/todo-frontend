import axios from "axios";

// Get user token
const user = JSON.parse(localStorage.getItem("todoapp"));

// Create a custom Axios instance with baseURL and headers
const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
 // ✅ Corrected baseURL
  headers: {
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  },
});

// CREATE TODO
const createTodo = (data) => {
  return API.post("/todo/create", data); // ✅ now hits /api/v1/todo/create
};

// GET ALL TODOs
const getAllTodo = () => {
  return API.get("/todo/getAll");
};


// UPDATE TODO
const updateTodo = (id, data) => {
  return API.patch(`/todo/update/${id}`, data); // ✅ /api/v1/todo/update/:id
};

// DELETE TODO
const deleteTodo = (id) => {
  return API.delete(`/todo/delete/${id}`); // ✅ /api/v1/todo/delete/:id
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
