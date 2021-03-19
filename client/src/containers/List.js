import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import './styles/List.css';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteList, renameList } from '../actions/list';
import { reorderTask } from '../actions/task';
import FormControl from 'react-bootstrap/FormControl';
import Task from './Task';
import NewTask from './NewTask';
import { ReactSortable } from 'react-sortablejs';

const List = ({
  list,
  board: { board },
  deleteList,
  renameList,
  reorderTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  function toggleTitle() {
    setIsEditing(!isEditing);
  }

  function handleSubmit(event) {
    renameList(board.id, list.id, event.target.value);
    toggleTitle();
  }
  function end(event) {
    const fromListId = event.from.parentElement.id;
    const toListId = event.to.parentElement.id;
    reorderTask(
      board.id,
      board,
      event.item.id,
      fromListId,
      toListId,
      event.newIndex,
      event.oldIndex
    );
  }
  return (
    <Card id={list.id} className='List' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          {isEditing ? (
            <FormControl
              placeholder={list.name}
              defaultValue={list.name}
              onBlur={(e) => handleSubmit(e)}
            />
          ) : (
            <div onClick={toggleTitle}>{list.name}</div>
          )}
        </Card.Title>
        <div id={list.id} key={list.id}>
          <ReactSortable
            list={list.Tasks}
            setList={() => {}}
            onEnd={(e) => end(e)}
            group='shared'
          >
            {list.Tasks &&
              list.Tasks.map((task) => (
                <Task key={task.id} task={task} boardId={board.id} />
              ))}
          </ReactSortable>
        </div>
        <NewTask boardId={board.id} list={list} />
      </Card.Body>
      <Card.Footer>
        <Button variant='danger' onClick={() => deleteList(board.id, list.id)}>
          Delete list
        </Button>
      </Card.Footer>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  board: state.board,
});
export default connect(mapStateToProps, {
  deleteList,
  renameList,
  reorderTask,
})(List);
