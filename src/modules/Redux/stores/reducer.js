import actionTypes from '../actionTypes';

const initialState = {
  stores: [],
  store: {},
  produks: [],
  reports: {}
};

/**
 * @name stores
 * @description reducer untuk stores
 */
const stores = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.stores.SET_STORES:
      return {
        ...state,
        stores: action.value
      };

    case actionTypes.stores.SET_STORE:
      return {
        ...state,
        store: action.value
      };

    case actionTypes.stores.SET_PRODUKS:
      return {
        ...state,
        produks: action.value
      };

    case actionTypes.stores.SET_REPORTS:
      return {
        ...state,
        reports: action.value
      };

    case actionTypes.stores.CLEAR_STORES:
      return initialState;
    default:
      return state;
  }
};

export default stores;
