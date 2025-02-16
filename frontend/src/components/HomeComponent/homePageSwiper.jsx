import React, { useState } from "react";
import "../../assets/css/homepageswiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IconButton, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const initialSwiperData = [
  {
    image: "https://example.com/swiperimg1.png",
    text: "Transform your business with cutting-edge technology and tailored IT services.",
  },
  {
    image: "https://example.com/swiperimg2.png",
    text: "Secure, scalable, and cost-effective cloud solutions for modern enterprises.",
  },
  {
    image: "https://example.com/swiperimg3.png",
    text: "Keep your data safe with advanced security measures and proactive monitoring.",
  },
  {
    image: "https://example.com/swiperimg4.png",
    text: "Custom-built applications to enhance efficiency and drive innovation.",
  },
  {
    image: "https://example.com/swiperimg5.png",
    text: "Leverage AI-driven solutions for smarter business operations and growth.",
  },
  {
    image: "https://example.com/swiperimg6.png",
    text: "Expert guidance and round-the-clock support for seamless IT management.",
  },
];

export default function Homepageswiper({ editMode }) {
  const [swiperData, setSwiperData] = useState(initialSwiperData);
  const [newSlide, setNewSlide] = useState({ image: "", text: "" });
  const [editingIndex, setEditingIndex] = useState(null); // Track which slide is being edited
  const [open, setOpen] = useState(false); // Modal open state

  // Handle input change for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSlide({ ...newSlide, [name]: value });
  };

  // Add or edit a swiper slide
  const handleAddOrEditSlide = () => {
    if (newSlide.image && newSlide.text) {
      if (editingIndex === null) {
        // Adding a new slide
        setSwiperData([...swiperData, newSlide]);
      } else {
        // Editing an existing slide
        const updatedSwiperData = swiperData.map((slide, index) =>
          index === editingIndex ? newSlide : slide
        );
        setSwiperData(updatedSwiperData);
        setEditingIndex(null); // Reset editing index after saving
      }
      setNewSlide({ image: "", text: "" }); // Reset form after adding/editing
      setOpen(false); // Close modal
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handle editing of a slide
  const handleEditSlide = (index) => {
    setNewSlide(swiperData[index]); // Populate the form with the selected slide's data
    setEditingIndex(index); // Set the editing index
    setOpen(true); // Open the modal
  };

  // Handle adding a new slide
  const handleAddNewSlide = () => {
    setNewSlide({ image: "", text: "" }); // Reset form for a new slide
    setEditingIndex(null); // Not editing any existing slide
    setOpen(true); // Open the modal
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setNewSlide({ image: "", text: "" }); // Reset form
    setEditingIndex(null); // Exit edit mode
    setOpen(false); // Close modal
  };

  return (
    <div className="home-swiperdiv">
      <div className="home-miniswiperdiv">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
          breakpoints={{
            "@0.00": { slidesPerView: 1, spaceBetween: 10 },
            "@0.75": { slidesPerView: 2, spaceBetween: 20 },
            "@1.00": { slidesPerView: 3, spaceBetween: 40 },
            "@1.50": { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {swiperData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="home-swiperslidediv">
                {editMode && !open && (
                  <IconButton
                    className="edit-icon-btn"
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={() => handleEditSlide(index)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <div className="home-swiperimagediv">
                  <img className="home-swiperimage" src={item.image} alt={"slide" + index} />
                </div>
                <p>{item.text}</p>
              </div>
            </SwiperSlide>
          ))}

          {/* Add New Slide */}
          {editMode && (
            <SwiperSlide>
              <div className="home-swiperslidediv add-new-slide" onClick={handleAddNewSlide}>
                <div className="add-icon-wrapper">
                  <AddIcon style={{ fontSize: "3rem", color: "#6c757d" }} />
                </div>
                <p>Add New Slide</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Material-UI Dialog (Modal) for the form */}
      <Dialog open={open} onClose={handleCancelEdit}>
        <DialogTitle>{editingIndex === null ? "Add New Slide" : "Edit Slide"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="image"
            value={newSlide.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Slide Text"
            name="text"
            value={newSlide.text}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleAddOrEditSlide} style={{ marginRight: "10px" }}>
            {editingIndex === null ? "Add Slide" : "Save Changes"}
          </Button>
          <Button variant="outlined" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
