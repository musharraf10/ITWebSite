import React, { useState } from "react";
import CountUp from "react-countup";
import { Edit, Plus, Save, X } from "lucide-react"; // Icons for edit, add, save, cancel
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Importing Material-UI components
import "./AboutYourCompany.css";
import HomeMin from "../../components/HomeComponent/HomeMin";

export default function AboutYourCompany({ editMode }) {
  const [companyLogos, setCompanyLogos] = useState([
    {
      id: 1,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, // Random logo
      link: "https://company1.com",
    },
    {
      id: 2,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, // Random logo
      link: "https://company2.com",
    },
  ]);

  const [stats] = useState([
    { value: 600, title: "Happy Customers", suffix: "+" },
    { value: 100, title: "Satisfied Clients", suffix: "%" },
    { value: 350, title: "Total Projects", suffix: "+" },
    { value: 7, title: "Years of Experience", suffix: "+" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editLogoIndex, setEditLogoIndex] = useState(null); // Index of logo being edited
  const [editLogoUrl, setEditLogoUrl] = useState(""); // URL of the logo being edited
  const [isAdding, setIsAdding] = useState(false);
  const [newLogo, setNewLogo] = useState({ src: "", link: "" });

  // Handle edit button click
  const handleEditLogo = (logo, index) => {
    setIsEditing(true);
    setEditLogoIndex(index);
    setEditLogoUrl(logo.src); // Set the current logo URL to the input
  };

  // Save the edited logo URL
  const handleSaveLogo = () => {
    const updatedLogos = companyLogos.map((logo, index) =>
      index === editLogoIndex ? { ...logo, src: editLogoUrl } : logo
    );
    setCompanyLogos(updatedLogos);
    setIsEditing(false);
    setEditLogoIndex(null);
  };

  // Add a new logo
  const handleAddLogo = () => {
    setCompanyLogos((prev) => [
      ...prev,
      { id: Date.now(), src: newLogo.src, link: newLogo.link },
    ]);
    setNewLogo({ src: "", link: "" });
    setIsAdding(false);
  };

  return (
    <>
      <div className="aboutcontainer">
        {/* Stats Section */}
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box">
              <h2 className="stat-value">
                <CountUp start={0} end={stat.value} duration={3} /> {stat.suffix}
              </h2>
              <p className="stat-title">{stat.title}</p>
            </div>
          ))}
        </div>

        <HomeMin editMode={editMode} />

        {/* Logos Section */}
        <div className="logos-wrapper">
          <div className="logos-container">
            {companyLogos.map((logo, index) => (
              <div className="logo-edit-container" key={logo.id}>
                <a href={logo.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={logo.src}
                    alt={`Company ${index + 1}`}
                    className="company-logo"
                  />
                </a>
                {editMode && (
                  <Edit
                    className="edit-iconLogo"
                    onClick={() => handleEditLogo(logo, index)}
                  />
                )}
              </div>
            ))}

            {/* "+" Icon to add a new logo */}
            {editMode && (
              <div className="add-logo-container" onClick={() => setIsAdding(true)}>
                <Plus className="add-logo-icon" />
              </div>
            )}
          </div>
        </div>

        {/* Edit Logo Modal with Material-UI */}
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogTitle>Edit Logo URL</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Logo URL"
              value={editLogoUrl}
              onChange={(e) => setEditLogoUrl(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveLogo}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Logo Modal with Material-UI */}
        <Dialog open={isAdding} onClose={() => setIsAdding(false)}>
          <DialogTitle>Add New Logo</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Logo URL"
              value={newLogo.src}
              onChange={(e) => setNewLogo({ ...newLogo, src: e.target.value })}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Link"
              value={newLogo.link}
              onChange={(e) => setNewLogo({ ...newLogo, link: e.target.value })}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddLogo}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
