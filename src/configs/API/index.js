import ApiRequest from "./config";
import { apiEndpoint } from "./url";

const API = {};

// request api call
API.login = ApiRequest.post(apiEndpoint.login);

export default API;
