import actionTypes from '../actionTypes';

/**
 * @name setLoadingApp
 * @param {*} value
 * @description redux action untuk set loading app
 */
export const setLoadingApp = value => ({
  type: actionTypes.global.SET_LOADING_APP,
  value
});

/**
 * @name setUser
 * @param {*} value
 * @description redux action untuk set user
 */
export const setUser = value => ({
  type: actionTypes.global.SET_USER,
  value
});

/**
 * @name clearGlobal
 * @description redux action untuk clear data profile
 */
export const clearGlobal = () => ({
  type: actionTypes.global.CLEAR_GLOBAL
});
