import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  login: `${appActiveConfig.api.baseUrl}/auth/login`,
  register: `${appActiveConfig.api.baseUrl}/auth/register`,
};

export { apiEndpoint };
