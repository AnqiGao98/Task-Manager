import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../actions/type';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(type);
  console.log(payload);
  switch (type) {
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
