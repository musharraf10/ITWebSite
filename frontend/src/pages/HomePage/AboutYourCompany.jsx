import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import "./AboutYourCompany.css";
import HomeMin from "../../components/HomeComponent/HomeMin";

export default function AboutYourCompany() {
  const companyLogos = [
    {
      src: "https://bcassetcdn.com/public/blog/wp-content/uploads/2022/11/09183937/denside-logo-design-d-letter-logo-concept-by-abdul-gaffar-dribbble.png",
      link: "https://company1.com",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2WwHYaRpMAQy2sV7jga3Ase-y9rToIxB1A&s",
      link: "https://company2.com",
    },
  ];

  const repeatCount = 50;
  const infiniteLogos = Array(repeatCount).fill(companyLogos).flat();

  const stats = [
    { value: 600, title: "Happy Customers", suffix: "+" },
    { value: 100, title: "Satisfied Clients", suffix: "%" },
    { value: 350, title: "Total Projects", suffix: "+" },
    { value: 7, title: "Years of Experience", suffix: "+" },
  ];

  const statRefs = useRef([]);
  const [visibleStats, setVisibleStats] = useState(
    new Array(stats.length).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      const updatedVisibleStats = statRefs.current.map((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
      });

      setVisibleStats((prev) =>
        prev.map((val, index) => val || updatedVisibleStats[index])
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (

    <>
    <div className="aboutcontainer">

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div
            ref={(el) => (statRefs.current[index] = el)}
            key={index}
            className={`stat-box ${visibleStats[index] ? "scalevalues" : ""}`}
          >
            <h2 className="stat-value">
              {visibleStats[index] ? (
                <CountUp start={0} end={stat.value} duration={3} />
              ) : (
                0
              )}
              {stat.suffix || ""}
            </h2>
            <p className="stat-title">{stat.title}</p>
          </div>
        ))}
      </div>

      <HomeMin/>

      <div className="logos-wrapper">
        <div className="logos-container">
          {infiniteLogos.map((logo, index) => (
            <a
              key={`duplicate-${index}`}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo.src}
                alt={`Company ${index + 1}`}
                className="company-logo"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
    </>

  );
}