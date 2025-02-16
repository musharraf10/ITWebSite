import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Login1 from "../../pages/Login2step";
import logo from "../../assets/logo.jpg";


import "./Navbar.css"



const Navbar1 = ({ scrollToSection }) => {
  const [loginVisible, setLoginVisible] = useState(false);

  const displayLogin = () => {
    setLoginVisible(!loginVisible);
  };

  return (
    <div>
      <Navbar
        expand="lg"
        style={{ background: "linear-gradient(135deg, #A1D6E2, #98d3ee)" }}
        variant="dark"
        className="navcontainer shadow-sm p-2"
      >
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-black">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img className="logoimg "
                src={logo}
                alt="logo"
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "30px",
                  borderRadius: "50%",
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                OSTECHSERVICE
              </motion.div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav " />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto text-white text-center">
              <Nav.Link
                onClick={() => scrollToSection("about")}
                className="mx-2"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
              >
                About
              </Nav.Link>
              <Nav.Link
                onClick={() => scrollToSection("services")}
                className="mx-2"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
              >
                Services
              </Nav.Link>
              {/* <Nav.Link
                onClick={() => scrollToSection("projects")}
                className="mx-2"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
              >
                Projects
              </Nav.Link> */}
              <Nav.Link
                onClick={() => scrollToSection("locations")}
                className="mx-2"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
              >
                Locations
              </Nav.Link>
              <Nav.Link
                onClick={() => scrollToSection("contact")}
                className="mx-2"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
              >
                Contact Us
              </Nav.Link>
              <Button
                variant="outline-light"
                className="ms-3"
                style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}

                onClick={displayLogin}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={loginVisible} onHide={displayLogin} centered>
        <Modal.Body>
          <Login1 />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar1;
