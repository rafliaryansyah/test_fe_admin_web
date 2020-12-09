import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

API.login = apiRequest.post(apiEndpoint.login);
API.register = apiRequest.post(apiEndpoint.register);

// customers
API.customers = apiRequest.get(apiEndpoint.customers, true);
API.customer = apiRequest.get(apiEndpoint.customer, true);

export default API;
