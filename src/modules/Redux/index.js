import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import actionTypes from './actionTypes';

/**
 * import masing-masing reducer disini
 */
import global from './global/reducer';
import dashboard from './dashboard/reducer';
import stores from './stores/reducer';
import banner from './banner/reducer';
import category from './category/reducer';
import voucher from './voucher/reducer';
import promo from './promo/reducer';
import terkait from './terkait/reducer';

/**
 * Reducer yang terpisah digabung jadi satu disini
 */
const reducer = combineReducers({
  global,
  dashboard,
  stores,
  banner,
  category,
  voucher,
  promo,
  terkait
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
export * from './dashboard/action';
export * from './stores/action';
export * from './banner/action';
export * from './category/action';
export * from './voucher/action';
export * from './promo/action';
export * from './terkait/action';
