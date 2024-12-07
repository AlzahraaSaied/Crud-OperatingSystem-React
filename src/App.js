import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Actions from "./components/Actions/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal/Modal";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [inputData, setInputData] = useState({
    brand: "",
    name: "",
    releaseYear: "",
    color: "",
  });
  const [modalInputData, setModalInputData] = useState({
    brand: "",
    name: "",
    releaseYear: "",
    color: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:3000/car", inputData)
      .then((response) => {
        return axios.get("http://localhost:3000/car");
      })
      .then((response) => {
        setRecords(response.data);
        setSuccessMessage("Car item added successfully!");
        setInputData({ brand: "", name: "", releaseYear: "", color: "" });
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("There was an error adding the car:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Edit the record
  const handleEdit = (id) => {
    const recordToEdit = records.find((record) => record.id === id);
    if (recordToEdit) {
      setShowModal(true);
      setModalMode("edit");
      setModalInputData({
        id: recordToEdit.id,
        brand: recordToEdit.brand,
        name: recordToEdit.name,
        releaseYear: recordToEdit.releaseYear,
        color: recordToEdit.color,
      });
    } else {
      setErrorMessage("Record not found.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  // Update the record
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`http://localhost:3000/car/${modalInputData.id}`, modalInputData)
      .then((response) => {
        const updatedRecords = records.map((record) =>
          record.id === modalInputData.id ? response.data : record
        );
        setRecords(updatedRecords);
        setSuccessMessage("Record updated successfully!");
        setShowModal(false);
        setTimeout(() => setSuccessMessage(""), 2000);
      })
      .catch((error) => {
        setErrorMessage("Failed to update the record. Please try again.");
        setTimeout(() => setErrorMessage(""), 2000);
      })
      .finally(() => setLoading(false));
  };

  // view the record
  const handleView = (id) => {
    const recordToView = records.find((record) => record.id === id);
    if (recordToView) {
      setShowModal(true);
      setModalMode("view");
      setModalContent({
        brand: recordToView.brand,
        name: recordToView.name,
        releaseYear: recordToView.releaseYear,
        color: recordToView.color,
      });
    } else {
      setErrorMessage("Record not found.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  // delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/car/${id}`)
      .then(() => {
        setRecords(records.filter((record) => record.id !== id));
        setSuccessMessage("Record deleted successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        setErrorMessage("Failed to delete the record. Please try again.");
        setLoading(false);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/car").then((response) => {
      setColumns(Object.keys(response.data[0]));
      setRecords(response.data);
    });
    setLoading(false);
  }, []);

  return (
    <Fragment>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-xl text-blue-600">
          Cars Information
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="brand"
            id="brand"
            value={inputData.brand}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) =>
              setInputData({ ...inputData, brand: e.target.value })
            }
          />
          <label
            htmlFor="brand"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Brand
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={inputData.name}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            min="1900"
            max="2099"
            value={inputData.releaseYear}
            name="releaseYear"
            id="releaseYear"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) =>
              setInputData({ ...inputData, releaseYear: e.target.value })
            }
          />
          <label
            htmlFor="releaseYear"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Release Year
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="color"
            value={inputData.color}
            id="color"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) =>
              setInputData({ ...inputData, color: e.target.value })
            }
          />
          <label
            htmlFor="color"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Color
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5"
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Save"}
        </button>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{successMessage}</div>}
      </form>

      <div className="shadow-md sm:rounded-lg mt-10">
        <table className="w-3/5 ml-auto me-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((c, index) => (
                <th className="px-6 py-4" key={index}>
                  {c}
                </th>
              ))}
              <th scope="col" className="px-20 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{d.id}</td>
                <td className="px-6 py-4">{d.brand}</td>
                <td className="px-6 py-4">{d.name}</td>
                <td className="px-6 py-4">{d.releaseYear}</td>
                <td className="px-6 py-4">{d.color}</td>
                <td>
                  <Actions
                    onDelete={() => handleDelete(d.id)}
                    onView={() => handleView(d.id)}
                    onEdit={() => handleEdit(d.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
        modalContent={modalContent}
      >
        {modalMode === "view" && modalContent && (
          <Fragment>
            <h2 className="text-xl font-bold mb-4 text-center text-green-600 ">
              Car Details
            </h2>
            <ul className="shadow-lg rounded-lg p-5 border border-gray-200">
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2">Brand:</span>
                {modalContent.brand}
              </li>
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2"> Name:</span>
                {modalContent.name}
              </li>
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2">Release Year:</span>{" "}
                {modalContent.releaseYear}
              </li>
              <li className="py-2 text-gray-600">
                <span className="text-green-600 pe-2">Color:</span>{" "}
                {modalContent.color}
              </li>
            </ul>
          </Fragment>
        )}
        {modalMode === "edit" && (
          <Fragment>
            <form
              onSubmit={handleUpdate}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-md mx-auto"
            >
              <div className="mb-4">
                <label className="block text-blue-700 font-medium mb-1">
                  Brand:
                </label>
                <input
                  type="text"
                  value={modalInputData.brand}
                  onChange={(e) =>
                    setModalInputData({
                      ...modalInputData,
                      brand: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-700 font-medium mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={modalInputData.name}
                  onChange={(e) =>
                    setModalInputData({
                      ...modalInputData,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-700 font-medium mb-1">
                  Release Year:
                </label>
                <input
                  type="text"
                  value={modalInputData.releaseYear}
                  onChange={(e) =>
                    setModalInputData({
                      ...modalInputData,
                      releaseYear: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-700 font-medium mb-1">
                  Color:
                </label>
                <input
                  type="text"
                  value={modalInputData.color}
                  onChange={(e) =>
                    setModalInputData({
                      ...modalInputData,
                      color: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded font-medium transition-colors"
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Update"}
              </button>
            </form>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
}

export default App;
