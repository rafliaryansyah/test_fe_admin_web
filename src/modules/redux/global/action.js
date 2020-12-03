import actionTypes from '../actionTypes';

/**
 * @name setLoadingApp
 * @param {*} value
 * @description redux action untuk set profile
 */
export const setLoadingApp = value => ({
  type: actionTypes.global.SET_LOADING_APP,
  value
});

/**
 * @name setSuccess
 * @param {*} value
 * @description redux action untuk set profile
 */
export const setSuccess = value => ({
  type: actionTypes.global.SET_SUCCESS,
  value
});

/**
 * @name setError
 * @param {*} value
 * @description redux action untuk set profile
 */
export const setError = value => ({
  type: actionTypes.global.SET_ERROR,
  value
});

/**
 * @name clearGlobal
 * @description redux action untuk clear data profile
 */
export const clearGlobal = () => ({
  type: actionTypes.global.CLEAR_GLOBAL
});
