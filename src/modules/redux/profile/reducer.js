import actionTypes from '../actionTypes';

const initialState = {};

/**
 * @name profile
 * @description reducer untuk profile
 */
const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.profile.SET_PROFILE:
      return {
        ...state,
        ...action.value
      };

    case actionTypes.profile.CLEAR_PROFILE:
      return initialState;
    default:
      return state;
  }
};

export default profile;
