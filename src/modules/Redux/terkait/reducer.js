import actionTypes from '../actionTypes';

const initialState = {
  id: '',
  dari: '',
  terkait: {}
};

/**
 * @name terkait
 * @description reducer untuk global app
 */
const terkait = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.terkait.SET_ID:
      return {
        ...state,
        id: action.value
      };

    case actionTypes.terkait.SET_DARI:
      return {
        ...state,
        dari: action.value
      };

    case actionTypes.terkait.SET_TERKAIT:
      return {
        ...state,
        terkait: action.value
      };

    case actionTypes.terkait.CLEAR_TERKAIT:
      return initialState;
    default:
      return state;
  }
};

export default terkait;
