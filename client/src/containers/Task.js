import React, { useState } from 'react';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteTask, updateTask } from '../actions/task';
import TaskCard from './TaskCard';

const Task = ({ task, boardId, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleShow = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);
  const handleSubmit = (taskName, taskDesc) => {
    handleClose();
    updateTask(boardId, task.id, taskName, taskDesc);
  };

  return (
    <div id={task.id}>
      {isEditing && (
        <TaskCard
          boardId={boardId}
          task={task}
          show={isEditing}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      <Card onClick={handleShow}>
        <Card.Body>
          {task.name}
          <a
            href='#'
            className='task-delete'
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(boardId, task.id);
            }}
          >
            x
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};
export default connect(null, { deleteTask, updateTask })(Task);
