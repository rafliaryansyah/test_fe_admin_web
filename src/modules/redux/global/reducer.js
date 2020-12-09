import actionTypes from '../actionTypes';

const initialState = {
  loadingApp: false
};

/**
 * @name global
 * @description reducer untuk global app
 */
const global = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.global.SET_LOADING_APP:
      return {
        ...state,
        loadingApp: action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default global;
