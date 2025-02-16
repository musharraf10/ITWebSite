import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import "./Ourservicepage.css";

export default function Ourservicespage({ editMode }) {
  const [services, setServices] = useState([
    { icon: "fa-computer", title: "Software", openings: 4000 },
    { icon: "fa-coins", title: "Finance", openings: 400 },
    { icon: "fa-square-poll-vertical", title: "Marketing", openings: 900 },
    { icon: "fa-wand-magic-sparkles", title: "Design", openings: 900 },
    { icon: "fa-code", title: "Development", openings: 8000 },
    { icon: "fa-gamepad", title: "Gaming", openings: 4000 },
    { icon: "fa-stethoscope", title: "Health", openings: 200 },
    { icon: "fa-fingerprint", title: "Security", openings: 1000 },
  ]);

  const [newService, setNewService] = useState({ icon: "", title: "", openings: "" });
  const [editingIndex, setEditingIndex] = useState(null); 
  const [open, setOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  
  const handleAddOrEditService = () => {
    if (newService.icon && newService.title && newService.openings) {
      if (editingIndex === null) {
        
        setServices([...services, { ...newService, openings: parseInt(newService.openings) }]);
      } else {
        
        const updatedServices = services.map((service, index) =>
          index === editingIndex
            ? { ...newService, openings: parseInt(newService.openings) }
            : service
        );
        setServices(updatedServices);
        setEditingIndex(null);
      }
      setNewService({ icon: "", title: "", openings: "" });
      setOpen(false); // Close modal
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEditService = (index) => {
    setNewService(services[index]);
    setEditingIndex(index); 
    setOpen(true); 
  };

  
  const handleAddNewService = () => {
    setNewService({ icon: "", title: "", openings: "" }); 
    setEditingIndex(null);
    setOpen(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setNewService({ icon: "", title: "", openings: "" }); 
    setEditingIndex(null);
    setOpen(false); 
  };

  return (
    <>
      <div className="ourservicespage">
        <h1 className="ourservicesheadline">Our Services</h1>
        <div className="allserviceitems">
          {services.map((service, index) => (
            <div className="items" key={index}>
              {editMode && !open && (
                <IconButton
                  className="edit-icon-btn"
                  style={{ position: "relative", top: "5px", left: "5px" }}
                  onClick={() => handleEditService(index)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <div className="itemicons">
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <div className="itemtext">
                <h5 className="pctext">{service.title}</h5>
                <p>({service.openings}+ Openings)</p>
              </div>
            </div>
          ))}

          {editMode && (
            <div className="items add-new-service" onClick={handleAddNewService}>
              <div className="add-icon-wrapper">
                <AddIcon style={{ fontSize: "3rem", color: "#6c757d" }} />
              </div>
              <div className="itemtext">
                <h5 className="pctext">Add New Service</h5>
              </div>
            </div>
          )}
        </div>

        <Dialog open={open} onClose={handleCancelEdit}>
          <DialogTitle>{editingIndex === null ? "Add New Service" : "Edit Service"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="FontAwesome Icon (e.g., fa-computer)"
              name="icon"
              value={newService.icon}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Service Title"
              name="title"
              value={newService.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Number of Openings"
              name="openings"
              type="number"
              value={newService.openings}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleAddOrEditService} style={{ marginRight: "10px" }}>
              {editingIndex === null ? "Add Service" : "Save Changes"}
            </Button>
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
