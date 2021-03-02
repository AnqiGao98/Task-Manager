import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/Home.css';
import { connect } from 'react-redux';
import { renameBoard } from '../actions/board';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const BoardTitle = ({ board: { board }, renameBoard }) => {
  const [newBoardName, setnewBoardName] = useState(board.name);
  const [isEditing, setIsEditing] = useState(false);

  function toggleTitle() {
    setIsEditing(!isEditing);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('rename here');
    renameBoard(board.id, newBoardName);
    toggleTitle();
  }

  return isEditing ? (
    <InputGroup size='lg'>
      <FormControl
        placeholder={board.name}
        onChange={(e) => setnewBoardName(e.target.value)}
      />
      <InputGroup.Append>
        <Button variant='outline-secondary' onClick={handleSubmit}>
          Update
        </Button>
        <Button variant='outline-secondary' onClick={toggleTitle}>
          Cancel
        </Button>
      </InputGroup.Append>
    </InputGroup>
  ) : (
    <div className='title' onClick={toggleTitle}>
      {newBoardName}
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { renameBoard })(BoardTitle);
