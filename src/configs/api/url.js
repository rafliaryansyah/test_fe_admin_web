import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  // auth
  login: `${appActiveConfig.api.baseurl}/admin/login`,
  register: `${appActiveConfig.api.baseurl}`,

  // dashboard
  dashboard: `${appActiveConfig.api.baseurl}/admin/dashboard`,

  // profile admin
  profile: `${appActiveConfig.api.baseurl}/admin/profile`,
  profileUpdate: `${appActiveConfig.api.baseurl}/admin/profile`,
  profileChangePassword: `${appActiveConfig.api.baseurl}/admin/profile/change-password`,

  // toko
  stores: `${appActiveConfig.api.baseurl}/admin/stores`,
  store: `${appActiveConfig.api.baseurl}/admin/stores`,
  storeUpdateStatus: `${appActiveConfig.api.baseurl}/admin/stores`,
  storeUpdateMode: `${appActiveConfig.api.baseurl}/admin/stores`,
  storeProduk: `${appActiveConfig.api.baseurl}/admin/stores`,
  storeUpdateStatusProduk: `${appActiveConfig.api.baseurl}/admin/stores`,

  // customers
  customers: `${appActiveConfig.api.baseurl}/admin/users`,
  customer: `${appActiveConfig.api.baseurl}/admin/users`,
  customerUpdateRole: `${appActiveConfig.api.baseurl}/admin/users`,
  customerAccessAdmin: `${appActiveConfig.api.baseurl}/admin/users`,
  customerDelete: `${appActiveConfig.api.baseurl}/admin/users`,
  customerRestore: `${appActiveConfig.api.baseurl}/admin/users`,

  // category
  category: `${appActiveConfig.api.baseurl}/admin/categories`,
  detailCategoryProducts: `${appActiveConfig.api.baseurl}/admin/categories`,
  detailCategoryServices: `${appActiveConfig.api.baseurl}/admin/categories`,
  createCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  updateCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  deleteCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  restoreCategory: `${appActiveConfig.api.baseurl}/admin/categories`,

  // voucher
  createVoucher: `${appActiveConfig.api.baseurl}/admin/vouchers`,
  readVoucher: `${appActiveConfig.api.baseurl}/admin/vouchers`,
  updateVoucher: `${appActiveConfig.api.baseurl}/admin/vouchers`,
  deleteVoucher: `${appActiveConfig.api.baseurl}/admin/vouchers`,
  restoreVoucher: `${appActiveConfig.api.baseurl}/admin/vouchers`,

  // banners

  // main
  readBannersMain: `${appActiveConfig.api.baseurl}/admin/banners/main`,
  createBannersMain: `${appActiveConfig.api.baseurl}/admin/banners/main`,
  updateBannersMain: `${appActiveConfig.api.baseurl}/admin/banners/main`,
  deleteBannersMain: `${appActiveConfig.api.baseurl}/admin/banners`,
  restoreBannersMain: `${appActiveConfig.api.baseurl}/admin/banners`,

  // highlight
  readBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners/highlight`,
  readDetailBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners`,
  createBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners/highlight`,
  updateBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners/highlight`,
  deleteBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners/highlight`,
  restoreBannersHighlight: `${appActiveConfig.api.baseurl}/admin/banners/highlight`,

  // mini
  readBannersMini: `${appActiveConfig.api.baseurl}/admin/banners/mini`,
  createBannersMini: `${appActiveConfig.api.baseurl}/admin/banners/mini`,
  updateBannersMini: `${appActiveConfig.api.baseurl}/admin/banners/mini`,
  deleteBannersMini: `${appActiveConfig.api.baseurl}/admin/banners/mini`,
  restoreBannersMini: `${appActiveConfig.api.baseurl}/admin/banners/mini`,

  // promo
  createPromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  readPromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  detailPromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  updatePromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  updateStatusFiturPromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  deletePromo: `${appActiveConfig.api.baseurl}/admin/promos`,
  restorePromo: `${appActiveConfig.api.baseurl}/admin/promos`
};

export { apiEndpoint };
