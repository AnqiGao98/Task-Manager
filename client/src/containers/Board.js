import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/Home.css';
import List from './List';
import Spinner from './Spinner';
import { createBoard, getBoard } from '../actions/board';
import { connect } from 'react-redux';
import NewList from './NewList';
import BoardTitle from './BoardTitle';

const Board = ({ board: { board, loading }, createBoard, getBoard }) => {
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const [boardName, setboardName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    createBoard({ boardName });
  }

  return loading && board == null ? (
    <Spinner />
  ) : (
    <div className='Board'>
      {board ? (
        <BoardTitle />
      ) : (
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>
              Welcome to Task Manager, you can create your board now
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Normal text'
              onChange={(e) => setboardName(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Create Board
          </Button>
        </Form>
      )}

      {board && (
        <div className='lists'>
          {board.Lists &&
            board.Lists.map((list) => <List key={list.id} list={list} />)}
          <NewList />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { createBoard, getBoard })(Board);
