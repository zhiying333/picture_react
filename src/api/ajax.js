import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const instance = axios.create({
  baseURL: '/picture',//代理接口
  timeout: 3000
})

instance.interceptors.request.use(config => {
  // console.log(config);
  let token = localStorage.getItem('token_key');
  if (config.headers.needToken) {
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
  const err = error.response;
  if (err.status === 401) {
    // navigate('/login');
    // window.location = '/login';
  }
  console.log('error', error);
  return new Promise(() => {});
})

export default instance;