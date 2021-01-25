import actionTypes from '../actionTypes';

const initialState = {
  promos: [],
  promo: {}
};

/**
 * @name promo
 * @description reducer untuk promo
 */
const promo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.promo.SET_PROMOS:
      return {
        ...state,
        promos: action.value
      };

    case actionTypes.promo.SET_PROMO:
      return {
        ...state,
        promo: action.value
      };

    case actionTypes.promo.CLEAR_PROMO:
      return initialState;
    default:
      return state;
  }
};

export default promo;
