import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

API.login = apiRequest.post(apiEndpoint.login);
API.register = apiRequest.post(apiEndpoint.register);

API.customers = apiRequest.get(apiEndpoint.customers, true);

export default API;
