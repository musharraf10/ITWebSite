import React, { useState } from "react";
import EditableModal from "../../components/Model";  
import {Button} from "react-bootstrap";
import Carousel from "../../components/HomeComponent/Carousel";
import AboutYourCompany from "./AboutYourCompany";
import CircleContent from "./CircleContent";
import Ourservicespage from "./Ourservicepage";
import Homepageswiper from "../../components/HomeComponent/homePageSwiper";
import Waves from "./Waves";
import HomeMin from "../../components/HomeComponent/HomeMin";


export const AdminHome = () => {
  const [editMode, setEditMode] = useState(false);
  const [modalData, setModalData] = useState(null);  // To store the current data being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Toggle edit mode when Edit button is clicked
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle editing a specific component (show modal)
  const handleEdit = (componentName, data) => {
    setModalData({ componentName, data });
    setIsModalOpen(true);
  };

  // Function to handle save (you can replace this with your own logic)
  const handleSave = (updatedData) => {
    console.log("Updated data:", updatedData);
    setIsModalOpen(false); // Close the modal after saving
    // You can add logic here to update the data in the components
  };

  return (
    <>
      <div className="allcontainer">
        <div className="navbarfixed d-flex justify-content-between mb-2">
          <Button variant="outline-warning" style={{ color: "black" }} onClick={toggleEditMode}>
            {editMode ? "Exit Edit Mode" : "Edit"}
          </Button>
        </div>

        <div>
          <Waves />
        </div>

        <div>
          {/* Pass editMode and handleEdit as props to components */}
          <Carousel editMode={editMode} onEdit={handleEdit} />
        </div>

        <div>
          {/* <HomeMin editMode={editMode} onEdit={handleEdit}/>   */}
          <AboutYourCompany editMode={editMode} onEdit={handleEdit} />
          
        </div>

        <CircleContent editMode={editMode} onEdit={handleEdit} />

        <div>
          <Ourservicespage editMode={editMode} onEdit={handleEdit} />
        </div>

        <div>
          <Homepageswiper editMode={editMode} onEdit={handleEdit} />
        </div>

        {/* Modal for editing */}
        {isModalOpen && (
          <EditableModal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={modalData?.data}
            componentName={modalData?.componentName}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default AdminHome;