import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TaskCard = ({ task, show, handleClose, handleSubmit }) => {
  const [newTaskName, setnewTaskName] = useState(task ? task.name : '');
  const [newDesc, setnewDesc] = useState(task ? task.description : '');

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type='text'
            defaultValue={newTaskName}
            onChange={(e) => setnewTaskName(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            onChange={(e) => setnewDesc(e.target.value)}
            defaultValue={newDesc}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => handleSubmit(newTaskName, newDesc)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default connect(null, {})(TaskCard);
