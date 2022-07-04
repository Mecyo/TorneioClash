import axios from "axios";
import store from './store'

function getToken() {
  var token = '';
  debugger
  if(store && store.state && store.state.user) {
    token = store.state.user.token;
  } else {
    return null;
  }

  return 'Bearer ' + token;
}

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: false,
});

api.interceptors.request.use(request => {
  // add auth header with jwt if account is logged in and request is to the api url
  const token = getToken();

  if (token) {
      request.headers.common.Authorization = token;
  }

  return request;
});

export default api
