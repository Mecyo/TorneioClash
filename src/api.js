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

function getUrl() {
  debugger
  const url = process.env.VUE_APP_API_PROD_URL;

  return url;
}

const api = axios.create({
    //baseURL: "https://curso-msr.herokuapp.com/",
    baseURL: getUrl(),
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
