import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask, getUserTask }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const closeModal = () => {
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-start px-5 py-3">
        {allTask?.map((task) => (
          <div
            className="bg-white border-2 border-blue-400 rounded-lg shadow-md mx-4 my-4 w-72"
            key={task._id}
          >
            {/* Card Header */}
            <div className="px-4 py-2 border-b border-blue-400">
              <div className="flex justify-between items-center">
                <h6 className="font-semibold truncate w-36">{task?.title.substring(0, 10)}</h6>
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    task?.isCompleted ? "bg-lime-300" : "bg-yellow-300"
                  }`}
                >
                  {task?.isCompleted ? "Completed" : "Incomplete"}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-4 py-3">
              <h6 className="font-bold text-lg">{task?.title}</h6>
              <p className="text-gray-700 text-sm mt-1">{task?.description}</p>
              <h6 className="text-gray-600 text-sm mt-2">
                Date: {task?.createdAt?.substring(0, 10)}
              </h6>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-2 border-t border-blue-400 flex justify-start">
              <button
                className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded mr-2"
                title="Edit Task"
                onClick={() => handleEdit(task)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                title="Delete Task"
                onClick={() => handleDelete(task._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <EditTodo
          task={editingTask}
          setShowModal={closeModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
