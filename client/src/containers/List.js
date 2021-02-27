import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';

const List = ({ list }) => {
  return (
    <Card className='List' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{list.name}</Card.Title>
        <Card.Text>card text</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button>Delete list</Button>
      </Card.Footer>
    </Card>
  );
};
//const mapStateToProps = (state) => {};
export default connect(null, {})(List);
