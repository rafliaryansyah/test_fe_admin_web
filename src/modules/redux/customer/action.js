import actionTypes from '../actionTypes';

/**
 * @name setCustomers
 * @param {*} value
 * @description redux action untuk clear data customers
 */
export const setCustomers = value => ({
  type: actionTypes.customer.SET_CUSTOMERS,
  value
});

/**
 * @name setCustomer
 * @param {*} value
 * @description redux action untuk clear data customers
 */
export const setCustomer = value => ({
  type: actionTypes.customer.SET_CUSTOMER,
  value
});

/**
 * @name clearCustomer
 * @description redux action untuk clear data customers
 */
export const clearCustomers = () => ({
  type: actionTypes.customer.CLEAR_CUSTOMER
});
