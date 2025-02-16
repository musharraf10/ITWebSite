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
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    text: "Transform your business with cutting-edge technology and tailored IT services.",
  },
  {
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    text: "Secure, scalable, and cost-effective cloud solutions for modern enterprises.",
  },
  {
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3Ds",
    text: "Keep your data safe with advanced security measures and proactive monitoring.",
  },
  {
    image: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    text: "Custom-built applications to enhance efficiency and drive innovation.",
  },
  {
    image: "https://media.istockphoto.com/id/1967994177/photo/cute-corgi-dog-in-a-wildflower-cage-sits-on-a-summer-sunny-meadow.jpg?s=2048x2048&w=is&k=20&c=F9UlpyFsgCX_cJWJzRT9sopeJmtG_sl12qYZgrvcGfk=",
    text: "Leverage AI-driven solutions for smarter business operations and growth.",
  },
  {
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsfGVufDB8fDB8fHww",
    text: "Expert guidance and round-the-clock support for seamless IT management.",
  },
];

export default function Homepageswiper({ editMode }) {
  const [swiperData, setSwiperData] = useState(initialSwiperData);
  const [newSlide, setNewSlide] = useState({ image: "", text: "" });
  const [editingIndex, setEditingIndex] = useState(null); 
  const [open, setOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSlide({ ...newSlide, [name]: value });
  };

  const handleAddOrEditSlide = () => {
    if (newSlide.image && newSlide.text) {
      if (editingIndex === null) {
        
        setSwiperData([...swiperData, newSlide]);
      } else {
        
        const updatedSwiperData = swiperData.map((slide, index) =>
          index === editingIndex ? newSlide : slide
        );
        setSwiperData(updatedSwiperData);
        setEditingIndex(null); 
      }
      setNewSlide({ image: "", text: "" }); 
      setOpen(false); 
    } else {
      alert("Please fill out all fields.");
    }
  };


  const handleEditSlide = (index) => {
    setNewSlide(swiperData[index]); 
    setEditingIndex(index); 
    setOpen(true);
  };

  const handleAddNewSlide = () => {
    setNewSlide({ image: "", text: "" });
    setEditingIndex(null); 
    setOpen(true);
  };

  const handleCancelEdit = () => {
    setNewSlide({ image: "", text: "" }); 
    setEditingIndex(null); 
    setOpen(false); 
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
        </Swiper>
      </div>

      {editMode && (
        <div className="fixed-add-slide">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNewSlide}
            style={{ marginTop: "20px" }}
          >
            Add New Slide
          </Button>
        </div>
      )}

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
