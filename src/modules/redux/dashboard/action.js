import actionTypes from '../actionTypes';

/**
 * @name setDashboard
 * @param {*} value
 * @description redux action untuk set dashboard
 */
export const setDashboard = value => ({
  type: actionTypes.dashboard.SET_DASHBOARD,
  value
});

/**
 * @name clearDashboard
 * @description redux action untuk clear data dashboard
 */
export const clearDashboard = () => ({
  type: actionTypes.dashboard.CLEAR_DASHBOARD
});
