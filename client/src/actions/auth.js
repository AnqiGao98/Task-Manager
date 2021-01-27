import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from './type';
import { setAlert } from './alert';

const axios = require('axios');

export const signup = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, email, password });
  try {
    const result = await axios.post('/api/users/signup', body, config);
    console.log(result);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: result.data,
    });
    console.log('signup successfully');
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const login = ({ username, password }) => async (dispatch) => {
  //construct http header and body
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const result = await axios.post('/api/users/login', body, config);
    console.log(result);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    console.log('login successfully');
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
