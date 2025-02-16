import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../assets/css/Carousel.css";
import { FaEdit, FaPlus } from "react-icons/fa"; // Import icons
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material"; // Import Material UI components

// Dummy data for carousel
const initialCarouselData = [
  {
    id: 1,
    image: "https://shorturl.at/d2ixJ",
    heading: "Transform",
    text: "with cutting-edge technology and tailored IT services.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsfGVufDB8fDB8fHww",
    heading: "Modern",
    text: "Secure, scalable, and cost-effective cloud solutions.",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/30318145/pexels-photo-30318145/free-photo-of-cozy-cafe-date-in-vancouver.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    heading: "Keep Safe",
    text: "Keep your data safe with advanced security measures.",
  },
];

export default function Carousel({ editMode }) {
  const [carouselData, setCarouselData] = useState(initialCarouselData);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State to control adding new items

  // Handle edit click
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditItem(item);
  };

  // Handle form submit (for editing)
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = carouselData.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    setCarouselData(updatedData);
    setIsEditing(false);
  };

  // Handle form field change (for editing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  // Handle form submit (for adding a new item)
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: carouselData.length + 1,
      image: e.target.image.value,
      heading: e.target.heading.value,
      text: e.target.text.value,
    };
    setCarouselData([...carouselData, newItem]);
    setIsAdding(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-minicontainer">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3} 
          threshold={8}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="custom-swiper"
        >
          {carouselData.map((item, index) => (
            <SwiperSlide key={index} className="carousel-slide">
              {/* Use background image for the container */}
              <div
                className={`carousel-div color-${index + 1}`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="textdiv">
                  <h5 className="carousel-heading">{item.heading}</h5>
                  <p className="carousel-text">{item.text}</p>

                  {/* Show Edit Button only in Edit Mode */}
                  {editMode && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit className="edit-icon" />
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add new item button */}
      {editMode && (
        <div className="add-btn-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setIsAdding(true)}
          >
            Add New Item
          </Button>
        </div>
      )}

      {/* Edit Modal using Material UI Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Slide</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Heading"
              name="heading"
              value={editItem?.heading || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Text"
              name="text"
              value={editItem?.text || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              name="image"
              value={editItem?.image || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditing(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Add Modal using Material UI Dialog */}
      <Dialog open={isAdding} onClose={() => setIsAdding(false)}>
        <DialogTitle>Add New Carousel Item</DialogTitle>
        <form onSubmit={handleAddSubmit}>
          <DialogContent>
            <TextField
              label="Heading"
              name="heading"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Text"
              name="text"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAdding(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
