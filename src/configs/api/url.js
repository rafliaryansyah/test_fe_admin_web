import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  // auth
  login: `${appActiveConfig.api.baseurl}/admin/login`,
  register: `${appActiveConfig.api.baseurl}`,

  // customers management
  customers: `${appActiveConfig.api.baseurl}/admin/users`,
  customer: `${appActiveConfig.api.baseurl}/admin/users`,
  customerUpdateRole: `${appActiveConfig.api.baseurl}/admin/users`,
  customerAccessAdmin: `${appActiveConfig.api.baseurl}/admin/users`,
  customerDelete: `${appActiveConfig.api.baseurl}/admin/users`,
  customerRestore: `${appActiveConfig.api.baseurl}/admin/users`
};

export { apiEndpoint };
