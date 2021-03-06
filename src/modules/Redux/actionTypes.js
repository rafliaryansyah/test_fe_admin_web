/**
 * promo action types
 */
const terkait = {
  SET_TERKAIT: 'TERKAIT/SET',
  SET_DARI: 'DARI/SET',
  SET_ID: 'ID/SET',
  CLEAR_TERKAIT: 'TERKAIT/CLEAR'
};

/**
 * promo action types
 */
const promo = {
  SET_PROMOS: 'PROMOS/SET',
  SET_PROMO: 'PROMO/SET',
  CLEAR_PROMO: 'PROMO/CLEAR'
};

/**
 * banner action types
 */
const banner = {
  SET_BANNERS: 'BANNERS/SET',
  CLEAR_BANNERS: 'BANNERS/CLEAR'
};

/**
 * voucher action types
 */
const voucher = {
  SET_VOUCHER: 'VOUCHER/SET',
  CLEAR_VOUCHER: 'VOUCHER/CLEAR'
};

/**
 * Category action types
 */
const category = {
  SET_CATEGORIESPRODUK: 'CATEGORIESPRODUK/SET',
  SET_DETAILCATEGORYPRODUCTS: 'DETAILCATEGORYPRODUCTS/SET',
  SET_CATEGORIESJASA: 'CATEGORIESJASA/SET',
  SET_DETAILCATEGORYSERVICES: 'DETAILCATEGORYSERVICES/SET',
  CLEAR_CATEGORIES: 'CATEGORIES/CLEAR'
};

/**
 * Category action types
 */
const stores = {
  SET_STORE: 'STORE/SET',
  CLEAR_STORES: 'STORES/CLEAR'
};

/**
 * Global action types
 */
const dashboard = {
  SET_DASHBOARD: 'DASHBOARD/SET',
  CLEAR_DASHBOARD: 'DASHBOARD/CLEAR'
};

/**
 * Profile action types
 */
const profile = {
  SET_PROFILE: 'PROFILE/SET',
  CLEAR_PROFILE: 'PROFILE/CLEAR'
};

/**
 * Global action types
 */
const global = {
  SET_LOADING_APP: 'LOADING_APP/SET',
  CLEAR_GLOBAL: 'GLOBAL/CLEAR'
};

/**
 * Action types
 */
const actionTypes = {
  global,
  dashboard,
  profile,
  category,
  stores,
  banner,
  voucher,
  promo,
  terkait
};

export default actionTypes;
