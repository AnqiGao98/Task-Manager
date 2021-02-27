import {
  GET_BOARD,
  CREATE_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  CLEAR_BOARD,
} from '../actions/type';

const initialState = {
  board: null,
  loading: true,
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOARD:
    case CREATE_BOARD:
      return {
        ...state,
        board: payload.board,
        loading: false,
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        board: null,
      };
    case CLEAR_BOARD:
      return {
        ...state,
        loading: false,
        board: null,
      };
    case RENAME_BOARD:
      return {
        ...state,
        loading: false,
        board: payload.board,
      };
    default:
      return state;
  }
}
