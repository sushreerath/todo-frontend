import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const PopModal = ({
  getUserTask,
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast.error("Please provide title and description");
      }

      const todo = await TodoServices.createTodo(data);
      setShowModal(false);
      getUserTask();
      toast.success("Task Created Successfully");
      console.log(todo);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button
                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopModal;
