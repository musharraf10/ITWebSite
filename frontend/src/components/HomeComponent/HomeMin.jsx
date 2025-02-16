import React, { useState } from "react";
import { Edit } from "lucide-react"; 
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"; 
import "../../assets/css/Homemin.css";

export default function HomeMin({ editMode }) {
  const [homeData, setHomeData] = useState({
    image: `https://picsum.photos/300?random=${Math.floor(Math.random() * 1000)}`, 
    heading: "About Us",
    paragraph: `We are more than just a networking platform; we are a community of forward-thinking businesses 
    and professionals driven by a shared vision of growth, collaboration, 
    and innovation. Founded with a passion for connecting businesses and fostering relationships, 
    our company has evolved into a thriving ecosystem where opportunities flourish, knowledge flows, and connections thrive.`,
    buttonText: "Contact Us",
  });

  const [editingField, setEditingField] = useState(null); 
  const [showImagePopup, setShowImagePopup] = useState(false); 
  const [newImageUrl, setNewImageUrl] = useState(""); 
  const handleChange = (key, value) => {
    setHomeData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleImageEdit = () => {
    setNewImageUrl(homeData.image); 
    setShowImagePopup(true); 
  };

  
  const handleImageSave = () => {
    handleChange("image", newImageUrl);
    setShowImagePopup(false); 
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
                  onBlur={() => setEditingField(null)} 
                  fullWidth
                  style={{color:"#1995AD"}}
                />
              ) : (
                <p
                  style={{color:"#1995AD"}}
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
            {/* #1995AD, #A1D6E2, #f1f1f2 */}
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
                  onBlur={() => setEditingField(null)} 
                  fullWidth
                />
              ) : (
                <p
                  className="home-paratag"
                  style={{color:"black"}}
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

            <div className="home-button-container">
              {editMode && editingField === "buttonText" ? (
                <TextField
                  style={{color:"#1995AD"}}
                  variant="outlined"
                  size="small"
                  value={homeData.buttonText}
                  onChange={(e) => handleChange("buttonText", e.target.value)}
                  onBlur={() => setEditingField(null)} 
                  fullWidth
                />
              ) : (
                <Button variant="contained" onClick={() => editMode && setEditingField("buttonText")} style={{backgroundColor:"#1995AD"}}>
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
