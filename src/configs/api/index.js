import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};
// auth
API.login = apiRequest.post(apiEndpoint.login);
API.register = apiRequest.post(apiEndpoint.register);

// customers management
API.customers = apiRequest.get(apiEndpoint.customers, true);
API.customer = apiRequest.get(apiEndpoint.customer, true);
API.customerUpdateRole = apiRequest.get(apiEndpoint.customerUpdateRole, true);
API.customerAccessAdmin = apiRequest.get(apiEndpoint.customerAccessAdmin, true);
API.customerDelete = apiRequest.get(apiEndpoint.customerDelete, true);
API.customerRestore = apiRequest.get(apiEndpoint.customerRestore, true);

// category
API.category = apiRequest.get(apiEndpoint.category, true);
API.createCategory = apiRequest.get(apiEndpoint.createCategory, true);
API.updateCategory = apiRequest.get(apiEndpoint.updateCategory, true);
API.deleteCategory = apiRequest.get(apiEndpoint.deleteCategory, true);
API.restoreCategory = apiRequest.get(apiEndpoint.restoreCategory, true);

export default API;
