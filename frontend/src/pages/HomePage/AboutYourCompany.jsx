import React, { useState } from "react";
import CountUp from "react-countup";
import { Edit, Plus } from "lucide-react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import "./AboutYourCompany.css";
import HomeMin from "../../components/HomeComponent/HomeMin";
import { Autoplay, Navigation, Pagination } from "swiper/modules";



export default function AboutYourCompany({ editMode }) {
  const [companyLogos, setCompanyLogos] = useState([
    {
      id: 1,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 2,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company2.com",
    },
    {
      id: 3,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 4,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 5,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 6,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 7,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 8,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 9,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 10,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
    {
      id: 11,
      src: `https://picsum.photos/100?random=${Math.floor(
        Math.random() * 1000
      )}`, 
      link: "https://company1.com",
    },
  ]);

  const [stats] = useState([
    { value: 600, title: "Happy Customers", suffix: "+" },
    { value: 100, title: "Satisfied Clients", suffix: "%" },
    { value: 350, title: "Total Projects", suffix: "+" },
    { value: 7, title: "Years of Experience", suffix: "+" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editLogoIndex, setEditLogoIndex] = useState(null); 
  const [editLogoUrl, setEditLogoUrl] = useState(""); 
  const [isAdding, setIsAdding] = useState(false);
  const [newLogo, setNewLogo] = useState({ src: "", link: "" });

  const handleEditLogo = (logo, index) => {
    setIsEditing(true);
    setEditLogoIndex(index);
    setEditLogoUrl(logo.src);
  };

  const handleSaveLogo = () => {
    const updatedLogos = companyLogos.map((logo, index) =>
      index === editLogoIndex ? { ...logo, src: editLogoUrl } : logo
    );
    setCompanyLogos(updatedLogos);
    setIsEditing(false);
    setEditLogoIndex(null);
  };

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
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box">
              <h2 className="stat-value" style={{ color: "#1995AD" }}>
                <CountUp start={0} end={stat.value} duration={3} /> {stat.suffix}
              </h2>
              <p className="stat-title" style={{ color: "#1995AD" }}>{stat.title}</p>
            </div>
          ))}
        </div>

        <HomeMin editMode={editMode} />

        {/* Swiper for logo sliding */}
        <div className="logos-wrapper">
          <Swiper
          modules={[Autoplay]}
            spaceBetween={5}
            slidesPerView={6}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            
            // pagination={{ clickable: true }}
          >
            {companyLogos.map((logo, index) => (
              <SwiperSlide key={logo.id}>
                <div className="logo-edit-container">
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
              </SwiperSlide>
            ))}

            {editMode && (
              <SwiperSlide>
                <div className="add-logo-container" onClick={() => setIsAdding(true)}>
                  <Plus className="add-logo-icon" />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* Dialog for editing logo */}
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
            <Button variant="contained" color="primary" onClick={handleSaveLogo}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for adding a new logo */}
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
            <Button variant="contained" color="primary" onClick={handleAddLogo}>
              Add
            </Button>
            <Button variant="outlined" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}