import actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  skeleton: false,
  success: "",
  error: "",
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.global.SET_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case actionTypes.global.SET_SKELETON:
      return {
        ...state,
        skeleton: action.value,
      };
    case actionTypes.global.SET_SUCCESS:
      return {
        ...state,
        success: action.value,
      };
    case actionTypes.global.SET_ERROR:
      return {
        ...state,
        error: action.value,
      };
    default:
      return state;
  }
};

export default global;
