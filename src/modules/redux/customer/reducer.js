import actionTypes from '../actionTypes';

const initialState = {
  customers: []
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
        ...action.value
      };

    case actionTypes.global.CLEAR_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export default customer;
