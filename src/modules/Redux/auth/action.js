import actionTypes from "../actionTypes";

/**
 * @name setAuth
 * @param {*} value
 * @description redux action untuk set auth
 */
export const setAuthLogin = (value) => ({
  type: actionTypes.authLogin.SET_AUTH_LOGIN,
  value,
});

/**
 * @name clearAuthLogin
 * @description redux action untuk clear data auth
 */
export const clearAuthLogin = () => ({
  type: actionTypes.authLogin.CLEAR_AUTH_LOGIN,
});
