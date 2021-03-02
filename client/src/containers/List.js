import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteList, renameList } from '../actions/list';
import FormControl from 'react-bootstrap/FormControl';

const List = ({ list, board: { board }, deleteList, renameList }) => {
  const [isEditing, setIsEditing] = useState(false);

  function toggleTitle() {
    setIsEditing(!isEditing);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('rename here');
    renameList(board.id, list.id, event.target.value);
    toggleTitle();
  }
  return (
    <Card className='List' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          {isEditing ? (
            <FormControl
              placeholder={list.name}
              onBlur={(e) => handleSubmit(e)}
            />
          ) : (
            <div onClick={toggleTitle}>{list.name}</div>
          )}
        </Card.Title>
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
export default connect(mapStateToProps, { deleteList, renameList })(List);
