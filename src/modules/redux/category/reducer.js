import actionTypes from '../actionTypes';

const initialState = {
  category: []
};

/**
 * @name category
 * @description reducer untuk global app
 */
const category = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.category.SET_CATEGORY:
      return {
        ...state,
        category: action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default category;
