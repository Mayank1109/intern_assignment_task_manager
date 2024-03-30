import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from "./ElipsisMenu";
import "./style.css";
function Task({ colIndex, taskIndex }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];
  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg shadow-md  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3  hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <div className="flex_it line">
          <p className="w-[200px] font-bold tracking-wide">{task.title}</p>
          <div
            className={`rounded-full w-7 h-7 bg-indigo-500 text-center text-white align_it`}
          >
            {task.priority}
          </div>
        </div>

        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {task.description}
        </p>

        <div className="flex_it line2">
          <p className="w-[200px]  tracking-wide">{task.assignee}</p>

          <div
            className={`w-6 h-6 bg-indigo-500 text-center text-white align_it`}
          >
            <img
              onClick={() => {
                setIsTaskModalOpen(true);
              }}
              src={elipsis}
              alt="elipsis"
              className=" cursor-pointer h-4"
            />
          </div>
        </div>

        <div
          className={`w-20 h-7 space_it bg-indigo-500 text-center text-white align_it`}
        >
          {task.status}
        </div>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
