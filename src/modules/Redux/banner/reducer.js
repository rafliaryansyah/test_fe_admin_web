import actionTypes from '../actionTypes';

const initialState = {
  banners: {}
};

/**
 * @name banners
 * @description reducer untuk banners
 */
const banner = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.banner.SET_BANNERS:
      return {
        ...state,
        banners: action.value
      };

    case actionTypes.banner.CLEAR_BANNERS:
      return initialState;
    default:
      return state;
  }
};

export default banner;
