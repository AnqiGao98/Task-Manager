import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/type';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
