import actionTypes from '../actionTypes';

/**
 * @name setProfile
 * @param {*} value
 * @description redux action untuk set profile
 */
export const setProfile = value => ({
  type: actionTypes.profile.SET_PROFILE,
  value
});

/**
 * @name clearProfile
 * @description redux action untuk clear data profile
 */
export const clearProfile = () => ({
  type: actionTypes.profile.CLEAR_PROFILE
});
