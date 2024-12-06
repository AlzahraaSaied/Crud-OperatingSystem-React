import React, { Fragment } from "react";
import "./Actions.module.css";

const Actions = ({ onEdit, onDelete, onView }) => {
  
  return (
    <Fragment>
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={onView}
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        View
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Delete
      </button>
    </div>
    </Fragment>
  );
};

export default Actions;
