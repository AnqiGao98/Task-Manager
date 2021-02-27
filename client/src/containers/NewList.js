import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const List = ({}) => {
  const [newListName, setnewListName] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    //createBoard({ newListName });
  }
  return (
    <Card className='NewList' style={{ width: '18rem' }}>
      <Card.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Label>Enter new list name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Normal text'
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
export default connect(null, {})(List);
