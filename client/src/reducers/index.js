import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import board from './board';

export default combineReducers({
  auth,
  alert,
  board,
});
