import {
  GET_BOARD,
  CREATE_BOARD,
  CLEAR_BOARD,
  RENAME_BOARD,
  BOARD_ERROR,
} from './type';
import { setAlert } from './alert';

const axios = require('axios');

export const createBoard = ({ name }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const result = await axios.post('/api/board', body, config);
    dispatch({
      type: CREATE_BOARD,
      payload: result.data,
    });
    console.log('successfully create board');
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getBoard = () => async (dispatch) => {
  dispatch({ type: CLEAR_BOARD });
  try {
    console.log('get board');
    const result = await axios.get('/api/board');
    dispatch({
      type: GET_BOARD,
      payload: result.data,
    });
    console.log('successfully get board');
  } catch (error) {
    console.log(error);
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const renameBoard = (boardId, name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const result = await axios.put(
      `/api/board/${boardId}/rename`,
      body,
      config
    );
    dispatch({
      type: RENAME_BOARD,
      payload: result.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: BOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
