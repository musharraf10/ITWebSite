import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "./ContactForm.css"; // Custom CSS file
import topGif from "../../assets/top.gif";
import successGif from "../../assets/success.gif";
// import "./Contactanimation";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyname: "",
    phone: "",
    type: "",
    description: "",
    termsAccepted: false,
    captcha: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.description.trim())
      newErrors.description = "Message is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("inside tyr");
      const response = axios.post("http://localhost:4000/contact", {
        name: formData.name,
        email: formData.email,
        companyname: formData.companyname,
        phone: formData.phone,
        description: formData.description,
        type: formData.type,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    if (validateForm()) {
      console.log("inside tyr");
      setShowSuccessAnimation(true);

      setTimeout(() => {
        setShowSuccessAnimation(false);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          companyname: "",
          phone: "",
          type: "",
          description: "",
          termsAccepted: false,
        });
      }, 3500); // Show success animation for 3.5 seconds
    }
  };

  return (
    <Container className="contact-form-container inputwidth">
      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="success-overlay">
          <img
            src={successGif}
            alt="Success Animation"
            className="success-gif"
          />
        </div>
      )}

      {/* Top GIF */}
      <div className="gif-container">
        <img src={topGif} alt="Conversation Starter" />
      </div>

      <h2 className="contact-title">START A CONVERSATION</h2>
      <p className="contact-subtitle">
        Share your requirements and we'll get back to you with how we can help.
      </p>

      {submitted && (
        <Alert variant="success">Form submitted successfully!</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name & Email - Side by Side */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isInvalid={!!errors.name}
                className="input-underline"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isInvalid={!!errors.email}
                className="input-underline"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Company & Phone - Side by Side */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Company Name"
                value={formData.companyname}
                onChange={(e) =>
                  setFormData({ ...formData, companyname: e.target.value })
                }
                className="input-underline"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                isInvalid={!!errors.phone}
                className="input-underline"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Type of Project */}
        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input-underline"
          >
            <option value="">Select a project type</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="AI / Machine Learning">AI / Machine Learning</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="E-Commerce">E-Commerce</option>
          </Form.Control>
        </Form.Group>

        {/* Message Field */}
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Description *"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            isInvalid={!!errors.description}
            className="input-underline"
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Terms and Conditions */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I accept the terms and conditions"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData({ ...formData, termsAccepted: e.target.checked })
            }
            isInvalid={!!errors.termsAccepted}
            style={{ display: "inline-flex", alignItems: "center" }} // Styling to keep inline
          />
          <Form.Control.Feedback type="invalid">
            {errors.termsAccepted}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-50">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
