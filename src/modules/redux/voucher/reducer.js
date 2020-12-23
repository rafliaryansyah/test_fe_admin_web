import actionTypes from '../actionTypes';

const initialState = {
  vouchers: []
};

/**
 * @name voucher
 * @description reducer untuk voucher
 */
const voucher = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.voucher.SET_VOUCHER:
      return {
        ...state,
        vouchers: action.value
      };

    case actionTypes.voucher.CLEAR_VOUCHER:
      return initialState;
    default:
      return state;
  }
};

export default voucher;
