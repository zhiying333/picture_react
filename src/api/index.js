import ajax from './ajax'

//用户注册接口
export const reqRegister = (username, password) => ajax.post('/api/register', {username, password});

//用户登录接口
export const reqLogin = (username, password) => ajax.post('/api/login', {username, password});

//获取照片分类
export const reqGetCates = () => ajax('/picture/cates');