import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};
// auth
API.login = apiRequest.post(apiEndpoint.login);
API.register = apiRequest.post(apiEndpoint.register);

// dashboard
API.dashboard = apiRequest.get(apiEndpoint.dashboard, true);

// profile admin
API.profile = apiRequest.get(apiEndpoint.profile, true);
API.profileUpdate = apiRequest.post(apiEndpoint.profileUpdate, true);
API.profileChangePassword = apiRequest.patch(
  apiEndpoint.profileChangePassword,
  true
);

// toko
API.stores = apiRequest.get(apiEndpoint.stores, true);
API.store = apiRequest.get(apiEndpoint.store, true);
API.storeUpdateStatus = apiRequest.put(apiEndpoint.storeUpdateStatus, true);
API.storeUpdateMode = apiRequest.patch(apiEndpoint.storeUpdateMode, true);
API.storeProduk = apiRequest.get(apiEndpoint.storeProduk, true);
API.storeUpdateStatusProduk = apiRequest.patch(
  apiEndpoint.storeUpdateStatusProduk,
  true
);

// customers management
API.customers = apiRequest.get(apiEndpoint.customers, true);
API.customer = apiRequest.get(apiEndpoint.customer, true);
API.customerUpdateRole = apiRequest.patch(apiEndpoint.customerUpdateRole, true);
API.customerAccessAdmin = apiRequest.patch(
  apiEndpoint.customerAccessAdmin,
  true
);
API.customerDelete = apiRequest.delete(apiEndpoint.customerDelete, true);
API.customerRestore = apiRequest.patch(apiEndpoint.customerRestore, true);

// category
API.category = apiRequest.get(apiEndpoint.category, true);
API.detailCategoryProducts = apiRequest.get(
  apiEndpoint.detailCategoryProducts,
  true
);
API.detailCategoryServices = apiRequest.get(
  apiEndpoint.detailCategoryServices,
  true
);
API.createCategory = apiRequest.post(apiEndpoint.createCategory, true);
API.updateCategory = apiRequest.post(apiEndpoint.updateCategory, true);
API.deleteCategory = apiRequest.delete(apiEndpoint.deleteCategory, true);
API.restoreCategory = apiRequest.patch(apiEndpoint.restoreCategory, true);

// voucher
API.createVoucher = apiRequest.post(apiEndpoint.createVoucher, true);
API.readVoucher = apiRequest.get(apiEndpoint.readVoucher, true);
API.updateVoucher = apiRequest.post(apiEndpoint.updateVoucher, true);
API.deleteVoucher = apiRequest.delete(apiEndpoint.deleteVoucher, true);
API.restoreVoucher = apiRequest.patch(apiEndpoint.restoreVoucher, true);

// log aktivitas
API.logActivity = apiRequest.get(apiEndpoint.logActivity, true);

// banners

// main
API.readBannersMain = apiRequest.get(apiEndpoint.readBannersMain, true);
API.createBannersMain = apiRequest.post(apiEndpoint.createBannersMain, true);
API.updateBannersMain = apiRequest.post(apiEndpoint.updateBannersMain, true);
API.deleteBannersMain = apiRequest.delete(apiEndpoint.deleteBannersMain, true);
API.restoreBannersMain = apiRequest.patch(apiEndpoint.restoreBannersMain, true);

// highlight
API.readBannersHighlight = apiRequest.get(
  apiEndpoint.readBannersHighlight,
  true
);
API.readDetailBannersHighlight = apiRequest.get(
  apiEndpoint.readDetailBannersHighlight,
  true
);
API.createBannersHighlight = apiRequest.post(
  apiEndpoint.createBannersHighlight,
  true
);
API.updateBannersHighlight = apiRequest.post(
  apiEndpoint.updateBannersHighlight,
  true
);
API.deleteBannersHighlight = apiRequest.delete(
  apiEndpoint.deleteBannersHighlight,
  true
);
API.restoreBannersHighlight = apiRequest.patch(
  apiEndpoint.restoreBannersHighlight,
  true
);

// mini
API.readBannersMini = apiRequest.get(apiEndpoint.readBannersMini, true);
API.createBannersMini = apiRequest.post(apiEndpoint.createBannersMini, true);
API.updateBannersMini = apiRequest.post(apiEndpoint.updateBannersMini, true);
API.deleteBannersMini = apiRequest.delete(apiEndpoint.deleteBannersMini, true);
API.restoreBannersMini = apiRequest.patch(apiEndpoint.restoreBannersMini, true);

// promo
API.createPromo = apiRequest.post(apiEndpoint.createPromo, true);
API.readPromo = apiRequest.get(apiEndpoint.readPromo, true);
API.detailPromoProduct = apiRequest.get(apiEndpoint.detailPromoProduct, true);
API.detailPromoService = apiRequest.get(apiEndpoint.detailPromoService, true);
API.updatePromo = apiRequest.post(apiEndpoint.updatePromo, true);
API.updateStatusFiturPromo = apiRequest.patch(
  apiEndpoint.updateStatusFiturPromo,
  true
);
API.deletePromo = apiRequest.delete(apiEndpoint.deletePromo, true);
API.restorePromo = apiRequest.patch(apiEndpoint.restorePromo, true);

// kurir
API.readKurir = apiRequest.get(apiEndpoint.readKurir, true);
API.updateKurir = apiRequest.post(apiEndpoint.updateKurir, true);
API.deleteKurir = apiRequest.delete(apiEndpoint.deleteKurir, true);
API.restoreKurir = apiRequest.patch(apiEndpoint.restoreKurir, true);

// roles
API.readRoles = apiRequest.get(apiEndpoint.readRoles, true);
API.readPermissions = apiRequest.get(apiEndpoint.readPermissions, true);
API.createRoles = apiRequest.post(apiEndpoint.createRoles, true);
API.updateRoles = apiRequest.patch(apiEndpoint.updateRoles, true);
API.deleteRoles = apiRequest.delete(apiEndpoint.deleteRoles, true);

export default API;
