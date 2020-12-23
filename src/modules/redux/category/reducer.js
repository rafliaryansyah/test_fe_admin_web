import actionTypes from '../actionTypes';

const initialState = {
  categories: [],
  category: {}
};

/**
 * @name category
 * @description reducer untuk global app
 */
const category = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.category.SET_CATEGORIES:
      return {
        ...state,
        categories: action.value
      };

    case actionTypes.category.SET_CATEGORY:
      return {
        ...state,
        category: action.value
      };

    case actionTypes.category.CLEAR_CATEGORIES:
      return initialState;
    default:
      return state;
  }
};

export default category;
