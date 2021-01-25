import actionTypes from '../actionTypes';

const initialState = {
  dashboard: {}
};

/**
 * @name dashboard
 * @description reducer untuk dashboard
 */
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.dashboard.SET_DASHBOARD:
      return {
        ...state,
        dashboard: action.value
      };

    case actionTypes.dashboard.CLEAR_DASHBOARD:
      return initialState;
    default:
      return state;
  }
};

export default dashboard;
