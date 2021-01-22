import actionTypes from '../actionTypes';

const initialState = {
  categoriesProduk: [],
  detailCategoryProducts: {},
  categoriesJasa: [],
  detailCategoryServices: {}
};

/**
 * @name category
 * @description reducer untuk global app
 */
const category = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.category.SET_CATEGORIESPRODUK:
      return {
        ...state,
        categoriesProduk: action.value
      };

    case actionTypes.category.SET_DETAILCATEGORYPRODUCTS:
      return {
        ...state,
        detailCategoryProducts: action.value
      };

    case actionTypes.category.SET_CATEGORIESJASA:
      return {
        ...state,
        categoriesJasa: action.value
      };

    case actionTypes.category.SET_DETAILCATEGORYSERVICES:
      return {
        ...state,
        detailCategoryServices: action.value
      };

    case actionTypes.category.CLEAR_CATEGORIES:
      return initialState;
    default:
      return state;
  }
};

export default category;
