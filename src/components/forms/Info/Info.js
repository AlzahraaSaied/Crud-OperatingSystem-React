
export default function Info({info }) {
  return (
    <>
            <h2 className="text-xl font-bold mb-4 text-center text-green-600 ">
              Car Details
            </h2>
            <ul className="shadow-lg rounded-lg p-5 border border-gray-200">
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2">Brand:</span>
                {info.brand}
              </li>
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2"> Name:</span>
                {info.name}
              </li>
              <li className="py-2 text-gray-600 ">
                <span className="text-green-600 font-medium pe-2">Release Year:</span>{" "}
                {info.releaseYear}
              </li>
              <li className="py-2 text-gray-600">
                <span className="text-green-600 font-medium pe-2">Color:</span>{" "}
                {info.color}
              </li>
            </ul>
          </>
  )
}
