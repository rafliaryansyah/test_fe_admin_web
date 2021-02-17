import actionTypes from '../actionTypes';

const initialState = {
  store: {}
};

/**
 * @name stores
 * @description reducer untuk stores
 */
const stores = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.stores.SET_STORE:
      return {
        ...state,
        store: action.value
      };

    case actionTypes.stores.CLEAR_STORES:
      return initialState;
    default:
      return state;
  }
};

export default stores;
