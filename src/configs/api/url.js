import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  login: `${appActiveConfig.api.baseurl}/admin/login`,
  register: `${appActiveConfig.api.baseurl}/auth/register`,
  customers: `${appActiveConfig.api.baseurl}/admin/users`
};

export { apiEndpoint };
