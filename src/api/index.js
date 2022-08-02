import ajax from './ajax'

//用户注册接口
export const reqRegister = (username, password) => ajax.post('/api/register', {username, password});

//用户登录接口
export const reqLogin = (username, password) => ajax.post('/api/login', {username, password});

//获取用户信息
export const reqGetUserInfo = () => ajax('/picture/userInfo', {
  headers: {
    needToken: true
  }
});

//获取照片分类
export const reqGetCates = () => ajax('/picture/cates', {
  headers: {
    needToken: true
  }
});

//上传图片
export const reqUploadPicture = () => ajax('/picture/upload', {
  headers: {
    needToken: true
  }
});

//更新用户名
export const reqUpdateUsername = (username) => ajax({
  url: '/picture/updateName',
  headers: {
    needToken: true
  },
  method: 'POST',
  data: {
    username
  }
});