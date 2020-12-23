import actionTypes from '../actionTypes';

/**
 * @name setStores
 * @param {*} value
 * @description redux action untuk set stores
 */
export const setStores = value => ({
  type: actionTypes.stores.SET_STORES,
  value
});

/**
 * @name setStore
 * @param {*} value
 * @description redux action untuk set stores
 */
export const setStore = value => ({
  type: actionTypes.stores.SET_STORE,
  value
});

/**
 * @name setProduks
 * @param {*} value
 * @description redux action untuk set stores
 */
export const setProduks = value => ({
  type: actionTypes.stores.SET_PRODUKS,
  value
});

/**
 * @name setReports
 * @param {*} value
 * @description redux action untuk set stores
 */
export const setReports = value => ({
  type: actionTypes.stores.SET_REPORTS,
  value
});

/**
 * @name clearStores
 * @description redux action untuk clear stores
 */
export const clearStores = () => ({
  type: actionTypes.stores.CLEAR_STORES
});
