import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditableModal = ({ data, component, isArray, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={true} onHide={() => onSave(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {component}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render different forms based on component type */}
        {component === "about" && (
          <>
            <Form.Group>
              <Form.Label>About Your Company</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}
        {component === "services" && isArray && (
          <>
            {formData.map((service, index) => (
              <Form.Group key={index}>
                <Form.Label>Service {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  name={`service-${index}`}
                  value={service.title}
                  onChange={(e) =>
                    handleChange({ target: { name: `service[${index}].title`, value: e.target.value } })
                  }
                />
              </Form.Group>
            ))}
            {/* Add new service */}
            <Button onClick={() => setFormData([...formData, { title: "" }])}>
              Add New Service
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onSave(null)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditableModal;
