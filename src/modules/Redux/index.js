import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import actionTypes from "./actionTypes";

/**
 * import masing-masing reducer disini
 */
import global from "./global/reducer";

/**
 * Reducer yang terpisah digabung jadi satu disini
 */
const reducer = combineReducers({ global });

/**
 * redux store untuk aplikasi
 */
const store = createStore(reducer, applyMiddleware(thunk));

export { store, actionTypes };

/**
 * export action reducer disini
 */
export * from "./auth/action";
