import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { renameList, createList } from '../actions/list';

const List = ({ boardId, createList }) => {
  const [newListName, setnewListName] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    createList(boardId, newListName);
    event.target.reset();
  }
  return (
    <Card className='NewList' style={{ width: '18rem' }}>
      <Card.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Label>Enter new list name</Form.Label>
          <Form.Control
            type='text'
            placeholder='list name'
            onChange={(e) => setnewListName(e.target.value)}
          />
          <Button variant='primary' type='submit' className='button'>
            Add new list
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
//const mapStateToProps = (state) => {};
export default connect(null, { createList })(List);
