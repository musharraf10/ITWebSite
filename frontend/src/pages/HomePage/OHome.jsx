import React, { useRef, useEffect, useState } from "react";
import "./Home.css";
import Navbar1 from "../../components/NavBar/Navbar";
import Herosection from "../../components/HomeComponent/Herosection";
import Carousel from "../../components/HomeComponent/Carousel";
import Homepageswiper from "../../components/HomeComponent/homePageSwiper";
import HomeMin from "../../components/HomeComponent/HomeMin";
import Waves from "./Waves";
import AboutYourCompany from "./AboutYourCompany";
import Ourservicespage from "./Ourservicepage";
import CircleContent from "./CircleContent";
import ContactForm from "./ContactForm";

const OHome = () => {
  const heroSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const homeMinRef = useRef(null);
  const homePageSwiperRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const sections = [heroSectionRef, carouselRef, homeMinRef, homePageSwiperRef, servicesRef, aboutRef];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the section is visible
    );

    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  // Scroll function to handle section scrolling
// Scroll function to handle section scrolling
const scrollToSection = (section) => {
  switch (section) {
    case "herosection":
      heroSectionRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "carousel":
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "contact":
      homeMinRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "homepageSwiper":
      homePageSwiperRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "services":
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "about":
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    default:
      break;
  }
};


  return (
    <>
<div className="allcontainer">

    <div className="navbarfixed">

      <Navbar1 scrollToSection={scrollToSection} />
    </div>

      <div ref={heroSectionRef} data-section="herosection" className={`section ${visibleSections["herosection"] ? "fade-in" : "hidden"}`}>
        <Waves />
      </div>

      <div ref={carouselRef} data-section="carousel" className={`section ${visibleSections["carousel"] ? "fade-in" : "hidden"}`}>
        <Carousel />
      </div>
      
      <div ref={aboutRef} data-section="about" className={`section ${visibleSections["about"] ? "fade-in" : "hidden"}`}>
        <AboutYourCompany />
        {/* <HomeMin /> */}
      </div>
      <CircleContent/>
      <div ref={servicesRef} data-section="services" className={`section ${visibleSections["services"] ? "fade-in" : "hidden"}`}>
        <Ourservicespage />
      </div>

      
      

      <div ref={homePageSwiperRef} data-section="homepageSwiper" className={`section ${visibleSections["homepageSwiper"] ? "fade-in" : "hidden"}`}>
        <Homepageswiper />
      </div>

      <div ref={homeMinRef} data-section="contact" className={`section ${visibleSections["contact"] ? "fade-in" : "hidden"}`}>
      <ContactForm />
      </div>

      
      

</div>

    </>
  );
};

export default OHome;
