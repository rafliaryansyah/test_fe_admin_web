import actionTypes from '../actionTypes';

/**
 * @name setStore
 * @param {*} value
 * @description redux action untuk set detail store
 */
export const setStore = value => ({
  type: actionTypes.stores.SET_STORE,
  value
});

/**
 * @name clearStores
 * @description redux action untuk clear stores
 */
export const clearStores = () => ({
  type: actionTypes.stores.CLEAR_STORES
});
