import actionTypes from '../actionTypes';

/**
 * @name setProdukTerkait
 * @param {*} value
 * @description redux action untuk set produk terkait
 */
export const setProdukTerkait = value => ({
  type: actionTypes.terkait.SET_PRODUKTERKAIT,
  value
});

/**
 * @name setJasaTerkait
 * @param {*} value
 * @description redux action untuk set jasa terkait
 */
export const setJasaTerkait = value => ({
  type: actionTypes.terkait.SET_JASATERKAIT,
  value
});

/**
 * @name clearTerkait
 * @description redux action untuk clear data terkait
 */
export const clearTerkait = () => ({
  type: actionTypes.terkait.CLEAR_TERKAIT
});
