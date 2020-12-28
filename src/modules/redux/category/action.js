import actionTypes from '../actionTypes';

/**
 * @name setCategoriesProduk
 * @param {*} value
 * @description redux action untuk set data category
 */
export const setCategoriesProduk = value => ({
  type: actionTypes.category.SET_CATEGORIESPRODUK,
  value
});

/**
 * @name setCategoriesJasa
 * @param {*} value
 * @description redux action untuk set per data category
 */
export const setCategoriesJasa = value => ({
  type: actionTypes.category.SET_CATEGORIESJASA,
  value
});

/**
 * @name clearCategories
 * @description redux action untuk clear data Categories
 */
export const clearCategories = () => ({
  type: actionTypes.category.CLEAR_CATEGORIES
});
