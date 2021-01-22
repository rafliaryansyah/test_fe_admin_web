import actionTypes from '../actionTypes';

const initialState = {
  produkTerkait: {},
  jasaTerkait: {}
};

/**
 * @name terkait
 * @description reducer untuk global app
 */
const terkait = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.terkait.SET_PRODUKTERKAIT:
      return {
        ...state,
        produkTerkait: action.value
      };

    case actionTypes.terkait.SET_JASATERKAIT:
      return {
        ...state,
        jasaTerkait: action.value
      };

    case actionTypes.terkait.CLEAR_TERKAIT:
      return initialState;
    default:
      return state;
  }
};

export default terkait;
