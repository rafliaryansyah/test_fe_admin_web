import actionTypes from '../actionTypes';

/**
 * @name setBanners
 * @param {*} value
 * @description redux action untuk set Banners
 */
export const setBanners = value => ({
  type: actionTypes.banner.SET_BANNERS,
  value
});

/**
 * @name clearBanners
 * @description redux action untuk clear Banners
 */
export const clearBanners = () => ({
  type: actionTypes.stores.CLEAR_STORES
});
