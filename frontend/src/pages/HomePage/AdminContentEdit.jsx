import React, { useState } from "react";
import Carousel from "../../components/HomeComponent/Carousel";
import AboutYourCompany from "./AboutYourCompany";
import CircleContent from "./CircleContent";
import Ourservicespage from "./Ourservicepage";
import Homepageswiper from "../../components/HomeComponent/homePageSwiper";
import Waves from "./Waves";
import Button from "@mui/material/Button";
import HomeMin from "../../components/HomeComponent/HomeMin";


export const AdminHome = () => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = (componentName, data) => {
    setModalData({ componentName, data });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="allcontainer">
      <div className="navbarfixed d-flex justify-content-between mb-2">
      <Button
        variant="outlined"
        style={{ color: "white", borderColor: "#ffffff" , backgroundColor: "#1995AD", zIndex:1201}} 
        onClick={toggleEditMode}
      >
        {editMode ? "Exit Edit Mode" : "Edit"}
      </Button>
    </div>
        <div>
          <Waves />
        </div>

        <div>
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

      </div>
    </>
  );
};

export default AdminHome;