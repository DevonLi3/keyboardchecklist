// src/CheckList.js
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaPlus, FaTrash }   from 'react-icons/fa';
import ChecklistContainer from '../components/checklistcontainer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './checklist.css';

function CheckList() {
  const initialContainers = ['PCB', 'Plate', 'Foam', 'Stabilizers', 'Switches', 'Lube'];
  const [containers, setContainers] = useState(initialContainers);

  const addContainer = () => {
    const name = prompt('Enter the name for the new container:');
    if (name) {
      setContainers([...containers, name]);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Keyboard Build App</h1>
          <Button className="AddContainer" variant="primary" onClick={addContainer}>
            <FaPlus /> Add Container
          </Button>
        </Col>
      </Row>
      <Row>
        {containers.map((containerName, index) => (
          <Col md={4} key={index} className="mt-4">
            <ChecklistContainer name={containerName} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CheckList;
