import { LIST_ERROR, UPDATE_BOARD } from './type';
import { setAlert } from './alert';

export const addTask = (boardId, listId, taskName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name: taskName });
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

export const reorderList = (
  boardId,
  taskId,
  fromListId,
  toListId,
  orderNum
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ fromListId, toListId, orderNum });
  try {
    const result = await axios.put(
      `/api/board/${boardId}/task/${taskId}/reorder`,
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
