import React, { useState } from "react";
import { Edit } from "lucide-react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"; 
import "./CircleContent.css";

const CircleContent = ({ editMode }) => {
  const [titleText, setTitleText] = useState(
    "Award Winning Software, Customer Service & Company Culture"
  );
  const [buttonText, setButtonText] = useState("Who Recognizes Us");

  const [showTextEdit, setShowTextEdit] = useState(false); 
  // Handle text edit
  const handleTextEdit = () => {
    setShowTextEdit(true); 
  };

  // Save text changes
  const handleTextSave = () => {
    setShowTextEdit(false); 
  };

  return (
    <div className="circle-container">
      <div className="circle">
        <div className="content">
          <h1>{titleText}</h1>
          <button className="recognize-btn">{buttonText}</button>
          <p style={{ position: "relative"}}>
            {editMode && (
              <Edit
                className="edit-icon"
                onClick={handleTextEdit}
              />
            )}
          </p>
        </div>
      </div>

      <Dialog open={showTextEdit} onClose={() => setShowTextEdit(false)}>
        <DialogTitle>Edit Text</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            label="Title Text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTextSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowTextEdit(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CircleContent;
