import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";  // ✅ add this line

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,  // ✅ and this line
  },
});

export default store;
