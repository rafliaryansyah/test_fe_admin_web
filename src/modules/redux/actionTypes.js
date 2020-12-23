/**
 * promo action types
 */
const promo = {
  SET_PROMOS: 'PROMOS/SET',
  SET_PROMO: 'PROMO/SET',
  CLEAR_PROMO: 'PROMO/CLEAR'
};

/**
 * voucher action types
 */
const voucher = {
  SET_VOUCHER: 'VOUCHER/SET',
  CLEAR_VOUCHER: 'VOUCHER/CLEAR'
};

/**
 * banner action types
 */
const banner = {
  SET_BANNERS: 'BANNERS/SET',
  CLEAR_BANNERS: 'BANNERS/CLEAR'
};

/**
 * Category action types
 */
const stores = {
  SET_STORES: 'STORES/SET',
  SET_STORE: 'STORE/SET',
  SET_PRODUKS: 'PRODUKS/SET',
  SET_REPORTS: 'REPORTS/SET',
  CLEAR_STORES: 'STORES/CLEAR'
};

/**
 * Category action types
 */
const category = {
  SET_CATEGORIES: 'CATEGORIES/SET',
  SET_CATEGORY: 'CATEGORY/SET',
  CLEAR_CATEGORIES: 'CATEGORIES/CLEAR'
};

/**
 * Customer action types
 */
const customer = {
  SET_CUSTOMERS: 'CUSTOMERS/SET',
  SET_CUSTOMER: 'CUSTOMER/SET',
  CLEAR_CUSTOMER: 'CUSTOMER/CLEAR'
};

/**
 * Global action types
 */
const global = {
  SET_LOADING_APP: 'LOADING_APP/SET',
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
  profile,
  customer,
  category,
  stores,
  banner,
  voucher,
  promo
};

export default actionTypes;
