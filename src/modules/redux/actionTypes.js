/**
 * Category action types
 */
const category = {
  SET_CATEGORY: 'CATEGORY/SET',
  CLEAR_CUSTOMER: 'CUSTOMER/CLEAR'
};

/**
 * Customer action types
 */
const customer = {
  SET_CUSTOMERS: 'CUSTOMERS/SET',
  SET_CUSTOMER: 'CUSTOMER/SET',
  CLEAR_CUSTOMER: 'CUSTOMER/CLEAR'
};

/**
 * Global action types
 */
const global = {
  SET_LOADING_APP: 'LOADING_APP/SET',
  CLEAR_GLOBAL: 'GLOBAL/CLEAR'
};

/**
 * Profile action types
 */
const profile = {
  SET_PROFILE: 'PROFILE/SET',
  CLEAR_PROFILE: 'PROFILE/CLEAR'
};

/**
 * Action types
 */
const actionTypes = {
  global,
  profile,
  customer,
  category
};

export default actionTypes;
