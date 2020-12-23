import actionTypes from '../actionTypes';

/**
 * @name setCategories
 * @param {*} value
 * @description redux action untuk set data category
 */
export const setCategories = value => ({
  type: actionTypes.category.SET_CATEGORIES,
  value
});

/**
 * @name setCategory
 * @param {*} value
 * @description redux action untuk set per data category
 */
export const setCategory = value => ({
  type: actionTypes.category.SET_CATEGORY,
  value
});

/**
 * @name clearCategories
 * @description redux action untuk clear data Categories
 */
export const clearCategories = () => ({
  type: actionTypes.category.CLEAR_CATEGORIES
});
