import React, { useState } from "react";
import { FaCloud, FaDesktop } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CameraList = ({ cameraData, onDelete, onToggleStatus}) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Data
  const filteredData = cameraData.filter((camera) =>
    camera.name.toLowerCase().includes(searchText.toLowerCase()) ||
  camera.location.toLowerCase().includes(searchText.toLowerCase()) ||
  camera.recorder.toLowerCase().includes(searchText.toLowerCase()) ||
  (camera.tasks.toString()+`${camera.tasks > 1 ? 'Tasks' : 'Task' }`) .toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  return (
    <div className="container mx-auto p-6">
      {/* Title and Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Camera List</h1>
        <input
          type="text"
          placeholder="Search cameras..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Health
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Recorder
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Tasks
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((camera) => (
              <tr key={camera._id} className="hover:bg-gray-100">
                {/* Checkbox */}
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>

                {/* Name */}
                <td className="px-4 py-3 flex items-center space-x-2">
                  <span>{camera.name}</span>
                </td>

                {/* Health */}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <FaCloud className="text-gray-500" />
                      <span
                        className={`h-4 w-4 rounded-full ${
                          camera.health.cloud === "A"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaDesktop className="text-gray-500" />
                      <span
                        className={`h-4 w-4 rounded-full ${
                          camera.health.device === "A"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></span>
                    </span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {camera.location || "N/A"}
                </td>

                {/* Recorder */}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {camera.recorder || "N/A"}
                </td>

                {/* Tasks */}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {camera.tasks ? `${camera.tasks} ${camera.tasks > 1 ? 'Tasks' : 'Task' }` : "N/A"}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-4 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                      camera.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    onClick={() => onToggleStatus(camera?.id, camera?.status)}
                  >
                    {camera.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <button
                    className=" text-gray-600 hover:text-gray-600"
                    onClick={() => onDelete(camera.id)}
                  >
                    <TiCancel size="20px"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of{" "}
          {totalItems}
        </span>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraList;
