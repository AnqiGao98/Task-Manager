import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteList } from '../actions/list';

const List = ({ list, board: { board }, deleteList }) => {
  return (
    <Card className='List' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{list.name}</Card.Title>
        <Card.Text>card text</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => deleteList(board.id, list.id)}>
          Delete list
        </Button>
      </Card.Footer>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  board: state.board,
});
export default connect(mapStateToProps, { deleteList })(List);
