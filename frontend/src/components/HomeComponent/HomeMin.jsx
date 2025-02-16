import React, { useState } from "react";
import { Edit } from "lucide-react"; // Edit icon library
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"; // MUI components
import "../../assets/css/Homemin.css";

export default function HomeMin({ editMode }) {
  const [homeData, setHomeData] = useState({
    image: `https://picsum.photos/300?random=${Math.floor(Math.random() * 1000)}`, // Random placeholder image
    heading: "About Us",
    paragraph: `We are more than just a networking platform; we are a community of forward-thinking businesses 
    and professionals driven by a shared vision of growth, collaboration, 
    and innovation. Founded with a passion for connecting businesses and fostering relationships, 
    our company has evolved into a thriving ecosystem where opportunities flourish, knowledge flows, and connections thrive.`,
    buttonText: "Contact Us",
  });

  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [showImagePopup, setShowImagePopup] = useState(false); // Track image popup state
  const [newImageUrl, setNewImageUrl] = useState(""); // Store new image URL

  // Handler to change field value
  const handleChange = (key, value) => {
    setHomeData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle edit button click for image (show popup)
  const handleImageEdit = () => {
    setNewImageUrl(homeData.image); // Set current image URL in the popup input
    setShowImagePopup(true); // Show the image edit popup
  };

  // Handle saving new image URL from the popup
  const handleImageSave = () => {
    handleChange("image", newImageUrl);
    setShowImagePopup(false); // Close popup
  };

  return (
    <>
      <div className="home-container">
        <div className="home-minicontainer">
          <div className="home-imagediv">
            <div className="home-miniimagediv">
              <img onClick={handleImageEdit} src={homeData.image} alt="About Us" />
              {editMode && (
                <Edit className="edit-icon" onClick={handleImageEdit} />
              )}
            </div>
          </div>

          <div className="home-righttext">
            {/* Heading */}
            <div className="home-headingtag-container">
              {editMode && editingField === "heading" ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={homeData.heading}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  onBlur={() => setEditingField(null)} // Exit edit mode on blur
                  fullWidth
                />
              ) : (
                <p
                  className="home-headingtag"
                  onClick={() => editMode && setEditingField("heading")}
                >
                  {homeData.heading}
                </p>
              )}
              {editMode && editingField !== "heading" && (
                <Edit
                  className="edit-icon"
                  onClick={() => setEditingField("heading")}
                />
              )}
            </div>

            {/* Paragraph */}
            <div className="home-paratag-container">
              {editMode && editingField === "paragraph" ? (
                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  value={homeData.paragraph}
                  onChange={(e) => handleChange("paragraph", e.target.value)}
                  onBlur={() => setEditingField(null)} // Exit edit mode on blur
                  fullWidth
                />
              ) : (
                <p
                  className="home-paratag"
                  onClick={() => editMode && setEditingField("paragraph")}
                >
                  {homeData.paragraph}
                </p>
              )}
              {editMode && editingField !== "paragraph" && (
                <Edit
                  className="edit-icon"
                  onClick={() => setEditingField("paragraph")}
                />
              )}
            </div>

            {/* Button Text */}
            <div className="home-button-container">
              {editMode && editingField === "buttonText" ? (
                <TextField
                  variant="outlined"
                  size="small"
                  value={homeData.buttonText}
                  onChange={(e) => handleChange("buttonText", e.target.value)}
                  onBlur={() => setEditingField(null)} // Exit edit mode on blur
                  fullWidth
                />
              ) : (
                <Button variant="contained" onClick={() => editMode && setEditingField("buttonText")}>
                  {homeData.buttonText}
                </Button>
              )}
              {editMode && editingField !== "buttonText" && (
                <Edit
                  className="edit-icon"
                  onClick={() => setEditingField("buttonText")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Edit Dialog */}
      <Dialog open={showImagePopup} onClose={() => setShowImagePopup(false)}>
        <DialogTitle>Edit Image URL</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            label="Image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageSave} color="primary">
            Save
          </Button>
          <Button onClick={() => setShowImagePopup(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
