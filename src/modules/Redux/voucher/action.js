import actionTypes from '../actionTypes';

/**
 * @name setVoucher
 * @param {*} value
 * @description redux action untuk set data voucher
 */
export const setVoucher = value => ({
  type: actionTypes.voucher.SET_VOUCHER,
  value
});

/**
 * @name clearVoucher
 * @description redux action untuk clear data Voucher
 */
export const clearVoucher = () => ({
  type: actionTypes.voucher.CLEAR_VOUCHER
});
