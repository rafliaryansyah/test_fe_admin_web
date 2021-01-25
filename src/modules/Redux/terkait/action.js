import actionTypes from '../actionTypes';

/**
 * @name setID
 * @param {*} value
 * @description redux action untuk set data id
 */
export const setID = value => ({
  type: actionTypes.terkait.SET_ID,
  value
});

/**
 * @name setDari
 * @param {*} value
 * @description redux action untuk set data terkait dari mana
 */
export const setDari = value => ({
  type: actionTypes.terkait.SET_DARI,
  value
});

/**
 * @name setTerkait
 * @param {*} value
 * @description redux action untuk set data terkait
 */
export const setTerkait = value => ({
  type: actionTypes.terkait.SET_TERKAIT,
  value
});

/**
 * @name clearTerkait
 * @description redux action untuk clear data terkait
 */
export const clearTerkait = () => ({
  type: actionTypes.terkait.CLEAR_TERKAIT
});
