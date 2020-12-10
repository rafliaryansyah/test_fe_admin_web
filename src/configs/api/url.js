import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  // auth
  login: `${appActiveConfig.api.baseurl}/admin/login`,
  register: `${appActiveConfig.api.baseurl}`,

  // customers
  customers: `${appActiveConfig.api.baseurl}/admin/users`,
  customer: `${appActiveConfig.api.baseurl}/admin/users`,
  customerUpdateRole: `${appActiveConfig.api.baseurl}/admin/users`,
  customerAccessAdmin: `${appActiveConfig.api.baseurl}/admin/users`,
  customerDelete: `${appActiveConfig.api.baseurl}/admin/users`,
  customerRestore: `${appActiveConfig.api.baseurl}/admin/users`,

  // category
  category: `${appActiveConfig.api.baseurl}/admin/categories`,
  createCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  updateCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  deleteCategory: `${appActiveConfig.api.baseurl}/admin/categories`,
  restoreCategory: `${appActiveConfig.api.baseurl}/admin/categories`
};

export { apiEndpoint };
