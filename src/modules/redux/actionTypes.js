/**
 * Global action types
 */
const global = {
  SET_LOADING_APP: 'LOADING_APP/SET',
  SET_SUCCESS: 'SUCCESS/SET',
  SET_ERROR: 'ERROR/SET',
  CLEAR_GLOBAL: 'GLOBAL/CLEAR'
};

/**
 * Profile action types
 */
const profile = {
  SET_PROFILE: 'PROFILE/SET',
  CLEAR_PROFILE: 'PROFILE/CLEAR'
};

/**
 * Action types
 */
const actionTypes = {
  global,
  profile
};

export default actionTypes;
