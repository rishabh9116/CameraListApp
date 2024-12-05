import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "./services/api";
import CameraList from "./components/CameraList";

const App = () => {
  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    fetchCameras()
      .then((response) => setCameraData(response.data.data))
      .catch((error) => console.error("Error fetching camera data:", error));
  }, []);
  console.log('cameraData : ', cameraData.data);
  const handleDelete = (id) => {
    setCameraData(cameraData?.filter((camera) => camera.id !== id));
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateCameraStatus(id, newStatus).then(() =>
      setCameraData((prevData) =>
        prevData.map((camera) =>
          camera.id === id ? { ...camera, status: newStatus } : camera
        )
      )
    );
  };

  return (
    <div>
      <CameraList
        cameraData={cameraData}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default App;
