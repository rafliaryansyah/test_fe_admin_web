import actionTypes from '../actionTypes';

/**
 * @name setCategory
 * @param {*} value
 * @description redux action untuk set data category
 */
export const setCategory = value => ({
  type: actionTypes.category.SET_CATEGORY,
  value
});

/**
 * @name clearCustomer
 * @description redux action untuk clear data customers
 */
export const clearCustomers = () => ({
  type: actionTypes.customer.CLEAR_CUSTOMER
});
