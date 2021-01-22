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
 * @name setDetailCategoryProducts
 * @param {*} value
 * @description redux action untuk set data detail category
 */
export const setDetailCategoryProducts = value => ({
  type: actionTypes.category.SET_DETAILCATEGORYPRODUCTS,
  value
});

/**
 * @name setDetailCategoryServices
 * @param {*} value
 * @description redux action untuk set data detail category
 */
export const setDetailCategoryServices = value => ({
  type: actionTypes.category.SET_DETAILCATEGORYSERVICES,
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
