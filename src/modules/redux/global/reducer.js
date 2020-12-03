import actionTypes from '../actionTypes';

const initialState = {
  loadingApp: false,
  success: '',
  error: ''
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
        ...action.value
      };

    case actionTypes.global.SET_SUCCESS:
      return {
        ...state,
        ...action.value
      };

    case actionTypes.global.SET_ERROR:
      return {
        ...state,
        ...action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default global;
