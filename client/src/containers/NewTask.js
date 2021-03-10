import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { addTask } from '../actions/task';

const NewTask = ({ list, boardId, addTask }) => {
  const [newTaskName, setnewTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  function toggleTitle() {
    setIsEditing(!isEditing);
  }
  function handleSubmit(event) {
    event.preventDefault();
    toggleTitle();
    event.target.reset();
    addTask(boardId, list, newTaskName);
  }
  return (
    <div>
      {isEditing ? (
        <Card className='NewTask'>
          <Card.Body>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Control
                type='text'
                placeholder='list name'
                onChange={(e) => setnewTaskName(e.target.value)}
              />
              <Button variant='primary' type='submit' className='button'>
                Add task
              </Button>
              <Button
                variant='secondary'
                className='button'
                onClick={toggleTitle}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <a href='#' onClick={toggleTitle}>
          <Card.Footer>Add a task...</Card.Footer>
        </a>
      )}
    </div>
  );
};
//const mapStateToProps = (state) => {};
export default connect(null, { addTask })(NewTask);
