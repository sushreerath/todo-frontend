import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // use only if you have redux
import { toast } from "react-toastify";
import TodoServices from "../../Services/TodoServices";
import Navbar from "../../components/Layout/Navbar";
import Spinner from "../../components/Spinner";

const TodoList = () => {
  // Get user data from redux or localStorage fallback
  const reduxUserData = useSelector((state) => state.user.user); // optional, if you use redux
  const [userData, setUserData] = useState(() => {
    if (reduxUserData) return reduxUserData;
    try {
      const localData = JSON.parse(localStorage.getItem("todoapp"));
      return localData?.user || null;
    } catch {
      return null;
    }
  });

  const [allTask, setAllTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [todoStatus, setTodosStatus] = useState(""); // start with no filter or set "incomplete"
  const [loading, setLoading] = useState(false);

  const userId = userData?.id || userData?._id;

  // Function to fetch tasks from backend API
  const getUserTask = async () => {
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      const { data } = await TodoServices.getAllTodo(userId);
      setAllTask(data?.todos || []);
    } catch (error) {
      toast.error("Failed to fetch tasks");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    getUserTask();
  }, [userId]); // depends on user id if changed

  // Filter tasks based on selected todoStatus and allTask updates
  useEffect(() => {
    if (!Array.isArray(allTask)) {
      setFilteredTask([]);
      return;
    }

    if (todoStatus === "incomplete") {
      setFilteredTask(allTask.filter((t) => !t.isCompleted));
    } else if (todoStatus === "completed") {
      setFilteredTask(allTask.filter((t) => t.isCompleted));
    } else {
      // no filter or "all"
      setFilteredTask(allTask);
    }
  }, [allTask, todoStatus]);

  // Count tasks for buttons
  const incompleteCount = allTask.filter((t) => !t.isCompleted).length;
  const completedCount = allTask.filter((t) => t.isCompleted).length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
                <p className="text-gray-600 mt-1">Total: {allTask.length} tasks</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTodosStatus("incomplete")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    todoStatus === "incomplete"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
                >
                  Incomplete ({incompleteCount})
                </button>
                <button
                  onClick={() => setTodosStatus("completed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    todoStatus === "completed"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}
                >
                  Completed ({completedCount})
                </button>
                <button
                  onClick={() => setTodosStatus("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    todoStatus === "all"
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1`}
                >
                  All Tasks
                </button>
              </div>
            </div>
          </div>

          {/* Tasks content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[24rem]">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center animate-spin">
                  <div className="rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading your tasks...</p>
                </div>
              </div>
            ) : filteredTask.length > 0 ? (
              <div className="p-6">
                <div className="space-y-4">
                  {filteredTask.map((task) => (
                    <div
                      key={task._id || task.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {task.title || "Untitled Task"}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {task.description || "No description"}
                          </p>
                          {task.createdAt && (
                            <p className="text-xs text-gray-400 mt-2">
                              Created: {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="ml-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              task.isCompleted
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.isCompleted ? "Completed" : "Incomplete"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="text-center max-w-sm">
                  <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
                    <i className="fa-solid fa-clipboard-list text-6xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No {todoStatus && todoStatus !== "all" ? todoStatus : ""} tasks found
                  </h3>
                  <p className="text-gray-500">
                    {todoStatus === "incomplete"
                      ? "All your tasks are completed! Great job!"
                      : todoStatus === "completed"
                      ? "No completed tasks yet. Keep working!"
                      : "You don't have any tasks yet."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
