import axios from 'axios';

const instance = axios.create({
  baseURL: '/picture',//代理接口
  timeout: 3000
})

instance.interceptors.request.use(config => {
  console.log(config);
  let token = localStorage.getItem('token_key');
  if (config.url.includes('picture')) {
    if (token) {
      config.headers.Authorization = token;
    } else {
      throw '请先登录'
    }
  }
  return config;
})

instance.interceptors.response.use(response => {
  // console.log('res', response);
  return response.data;
}, error => {
  return new Promise(() => {});
})

export default instance;