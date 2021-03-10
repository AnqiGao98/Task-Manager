import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteList, renameList } from '../actions/list';
import FormControl from 'react-bootstrap/FormControl';

const Task = ({ task, board: { board } }) => {
  return (
    <Card id={task.id} className='Task'>
      <Card.Body>{task.name}</Card.Body>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  board: state.board,
});
export default connect(mapStateToProps, {})(Task);
