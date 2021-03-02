import {
  GET_LIST,
  LIST_ERROR,
  RENAME_LIST,
  REMOVE_LIST,
  ADD_LIST,
  UPDATE_BOARD,
} from './type';
import { setAlert } from './alert';

const axios = require('axios');

export const createList = (boardId, listName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name: listName });
  try {
    const result = await axios.post(
      `/api/board/${boardId}/lists`,
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

export const deleteList = (boardId, listId) => async (dispatch) => {
  //dispatch({ type: CLEAR_BOARD });
  try {
    console.log('get board');
    const result = await axios.delete(`/api/board/${boardId}/list/${listId}`);
    dispatch({
      type: UPDATE_BOARD,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const renameList = (boardId, listId, name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const result = await axios.put(
      `/api/board/${boardId}/list/${listId}/rename`,
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
