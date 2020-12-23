import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};
// auth
API.login = apiRequest.post(apiEndpoint.login);
API.register = apiRequest.post(apiEndpoint.register);

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
API.storeUpdateStatus = apiRequest.patch(apiEndpoint.storeUpdateStatus, true);
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

// banners
API.banners = apiRequest.get(apiEndpoint.banners, true);
API.createBannersMain = apiRequest.post(apiEndpoint.createBannersMain, true);
API.createBannersHighlight = apiRequest.post(
  apiEndpoint.createBannersHighlight,
  true
);
API.createBannersMini = apiRequest.post(apiEndpoint.createBannersMini, true);

// promo
API.createPromo = apiRequest.post(apiEndpoint.createPromo, true);
API.readPromo = apiRequest.get(apiEndpoint.readPromo, true);
API.detailPromo = apiRequest.get(apiEndpoint.detailPromo, true);
API.updatePromo = apiRequest.post(apiEndpoint.updatePromo, true);
API.updateStatusFiturPromo = apiRequest.patch(
  apiEndpoint.updateStatusFiturPromo,
  true
);
API.deletePromo = apiRequest.delete(apiEndpoint.deletePromo, true);
API.restorePromo = apiRequest.patch(apiEndpoint.restorePromo, true);

export default API;
