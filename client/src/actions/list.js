import { GET_LIST, LIST_ERROR } from './type';
import { setAlert } from './alert';

const axios = require('axios');

export const createList = ({ name }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const result = await axios.post('/board', body, config);
    dispatch({
      type: CREATE_BOARD_SUCCESS,
      payload: result.data,
    });
    console.log('successfully create board');
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: CREATE_BOARD_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteList = () => async (dispatch) => {
  dispatch({ type: CLEAR_BOARD });
  try {
    console.log('get board');
    const result = await axios.get('/board');
    dispatch({
      type: GET_BOARD_SUCCESS,
      payload: result.data,
    });
    console.log('successfully get board');
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BOARD_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
