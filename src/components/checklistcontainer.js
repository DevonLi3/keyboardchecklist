// src/components/ChecklistContainer.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FaPlus, FaCheck, FaTrash } from 'react-icons/fa';
import './checklistcontainer.css';

function ChecklistContainer({ name }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { text: newItem, completed: false }]);
      setNewItem('');
    }
  };

  const toggleItemCompletion = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <Card>
      <Card.Body className='cardbody'>
        <Card.Title className='cardtitle'>{name}</Card.Title>
        <Form>
          <Form.Group controlId={`newItem-${name}`}>
            <Form.Control
              type="text"
              placeholder="Add new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </Form.Group>
          <Button className="additem"  onClick={addItem}>
            <FaPlus /> Add Item
          </Button>
        </Form>
        <ul className="mt-3 list-unstyled">
          {items.map((item, index) => (
            <li key={index} className="d-flex align-items-center justify-content-between">
              <span
                onClick={() => toggleItemCompletion(index)}
                style={{ textDecoration: item.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {item.text}
              </span>
              <Button variant="danger" size="sm" onClick={() => removeItem(index)}>
                <FaTrash />
              </Button>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

export default ChecklistContainer;
