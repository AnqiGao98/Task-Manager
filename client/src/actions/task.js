import { LIST_ERROR, UPDATE_BOARD, BOARD_ERROR } from './type';
import { setAlert } from './alert';

const axios = require('axios');

export const addTask = (boardId, listId, taskName, taskDescription) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name: taskName, description: taskDescription });
  try {
    const result = await axios.post(
      `/api/board/${boardId}/list/${listId}/task`,
      body,
      config
    );
    dispatch({
      type: UPDATE_BOARD,
      payload: result.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const reorderTask = (
  boardId,
  board,
  taskId,
  fromListId,
  toListId,
  orderNum,
  oldIndex
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ fromListId, toListId, orderNum });
  try {
    let fromList = board.Lists.find((l) => l.id == fromListId);
    let toList = board.Lists.find((l) => l.id == toListId);
    let task = fromList.Tasks[oldIndex];
    fromList.Tasks.splice(oldIndex, 1);
    if (fromListId === toListId) {
      fromList.Tasks.splice(orderNum, 0, task);
      for (let i of fromList.Tasks) {
        i.order = fromList.Tasks.indexOf(i) + 1;
      }
    } else {
      toList.Tasks.splice(orderNum, 0, task);
      for (let i of toList.Tasks) {
        i.order = toList.Tasks.indexOf(i) + 1;
      }
    }
    board.Lists.map((l) => (l.id === fromListId ? (l = fromList) : l));
    board.Lists.map((l) => (l.id === toListId ? (l = fromList) : l));
    dispatch({
      type: UPDATE_BOARD,
      payload: { board },
    });
    await axios.put(
      `/api/board/${boardId}/task/${taskId}/reorder`,
      body,
      config
    );
  } catch (error) {
    dispatch(setAlert(error, 'danger'));
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updateTask = (
  boardId,
  taskId,
  taskName,
  taskDescription
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name: taskName, description: taskDescription });
  try {
    const result = await axios.put(
      `/api/board/${boardId}/task/${taskId}/edit`,
      body,
      config
    );
    dispatch({
      type: UPDATE_BOARD,
      payload: result.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteTask = (boardId, taskId) => async (dispatch) => {
  try {
    let result = await axios.delete(`/api/board/${boardId}/task/${taskId}`);
    dispatch({
      type: UPDATE_BOARD,
      payload: result.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
