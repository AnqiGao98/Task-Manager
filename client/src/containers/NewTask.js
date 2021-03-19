import React, { useState } from 'react';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { addTask } from '../actions/task';
import TaskCard from './TaskCard';

const NewTask = ({ boardId, list, addTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleShow = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);
  const handleSubmit = (taskName, taskDesc) => {
    handleClose();
    addTask(boardId, list.id, taskName, taskDesc);
  };
  return (
    <div>
      {isEditing && (
        <TaskCard
          show={isEditing}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      <a href='#' onClick={handleShow}>
        <Card.Footer>Add a task...</Card.Footer>
      </a>
    </div>
  );
};

export default connect(null, { addTask })(NewTask);
