import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../assets/css/Carousel.css";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
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
    image: "https://shorturl.at/gRFvf",
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

  // Handle edit click
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditItem(item);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = carouselData.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    setCarouselData(updatedData);
    setIsEditing(false);
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
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
          slidesPerView={5}
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
    </div>
  );
}
