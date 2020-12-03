import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import actionTypes from './actionTypes';

/**
 * import masing-masing reducer disini
 */
import global from './global/reducer';
import profile from './profile/reducer';

/**
 * Reducer yang terpisah digabung jadi satu disini
 */
const reducer = combineReducers({
  global,
  profile
});

/**
 * redux store untuk aplikasi
 */
const store = createStore(reducer, applyMiddleware(thunk));

export { store, actionTypes };

/**
 * export action reducer disini
 */
export * from './global/action';
export * from './profile/action';
