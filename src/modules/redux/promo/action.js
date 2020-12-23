import actionTypes from '../actionTypes';

/**
 * @name setPromos
 * @param {*} value
 * @description redux action untuk set data semua promo
 */
export const setPromos = value => ({
  type: actionTypes.promo.SET_PROMOS,
  value
});

/**
 * @name setPromo
 * @param {*} value
 * @description redux action untuk set data detail promo
 */
export const setPromo = value => ({
  type: actionTypes.promo.SET_PROMO,
  value
});

/**
 * @name clearPromo
 * @description redux action untuk clear semua data promo
 */
export const clearPromo = () => ({
  type: actionTypes.promo.CLEAR_PROMO
});
