import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import actionTypes from './actionTypes';

/**
 * import masing-masing reducer disini
 */
import profile from './profile/reducer';

/**
 * Reducer yang terpisah digabung jadi satu disini
 */
const reducer = combineReducers({
  profile,
});

/**
 * redux store untuk aplikasi
 */
const store = createStore(reducer, applyMiddleware(thunk));

export { store, actionTypes };

/**
 * export action reducer disini
 */
export * from './profile/action';
