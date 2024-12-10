import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Edit = ({ edit, handleUpdate, setModalInputData, loading}) => {
  return (
    <>
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Brand:</label>
          <input
            type="text"
            value={edit.brand}
            onChange={(e) =>
              setModalInputData({
                ...edit,
                brand: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Name:</label>
          <input
            type="text"
            value={edit.name}
            onChange={(e) =>
              setModalInputData({
                ...edit,
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
            value={edit.releaseYear}
            onChange={(e) =>
              setModalInputData({
                ...edit,
                releaseYear: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Color:</label>
          <input
            type="text"
            value={edit.color}
            onChange={(e) =>
              setModalInputData({
                ...edit,
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
    </>
  );
};
export default Edit;
