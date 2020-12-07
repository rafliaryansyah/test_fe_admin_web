import actionTypes from '../actionTypes';

/**
 * @name setCustomers
 * @param {*} value
 * @description redux action untuk set profile
 */
export const setCustomers = value => ({
  type: actionTypes.customer.SET_CUSTOMERS,
  value
});

/**
 * @name clearCustomer
 * @description redux action untuk clear data profile
 */
export const clearCustomer = () => ({
  type: actionTypes.customer.CLEAR_CUSTOMER
});
