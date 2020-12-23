import actionTypes from '../actionTypes';

const initialState = {
  customers: [],
  customer: {}
};

/**
 * @name customer
 * @description reducer untuk global app
 */
const customer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.customer.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.value
      };

    case actionTypes.customer.SET_CUSTOMER:
      return {
        ...state,
        customer: action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default customer;
