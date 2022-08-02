import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { reqLogin } from "../../api";
import { saveToken } from '../../redux/actions/user'
import './index.css'

function Login (props) {

  const { saveToken } = props;

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const inputHandler = (event) => {
    // console.log('event', event.target.name);
    const { name, value } = event.target;
    name === 'username' ? setUsername(value) : setPassword(value);
    // console.log(username, password);
  }

  const loginHandler = async () => {
    console.log('username', username);
    console.log('password', password);
    if (!username.trim() || !password.trim()) {
      alert('亲，用户名或密码不能为空哦！')
    };

    const usernameReg = /^(?!\w)[\u4e00-\u9fa5_a-zA-Z0-9]{2,16}/;
    const passwordReg = /[A-Za-z0-9]{4,6}/;

    if (!usernameReg.test(username)) {
      alert('用户名只能以中英文，数字，下划线组成，不能以数字开头,长度2到16位！')
    }

    if (!passwordReg.test(password)) {
      alert('密码只能由中英文和数字组成，长度4到6位哦！');
    }

    //登录请求
    let loginRes = await reqLogin(username, password);
    console.log('loginRes', loginRes);

    if (loginRes.status !== 0) {
      alert(loginRes.message);
      setUsername('');
      setPassword('');
    } else {
      saveToken(loginRes.token);
      navigate('/msite', {
        replace: true
      });
    }
  }

  const toRegister = () => {
    navigate('/register');
  }
  
  return (
    <div className="login">
      {/* <div className="bg"></div> */}
      <div className="login-card">
        <h2 className="title">珍照岁月，欢迎您！</h2>
        <ul className="form">
          <li className="item">
            <label className="label">
              <span className="l-tit">
                用户名：
                <i></i>
              </span>
              <input type="text" name="username" className="ipt" placeholder='请输入用户名' onChange={inputHandler}/>
            </label>
          </li>
          <li className="item">
            <label className="label">
              <span className="l-tit">
                密 码：
                <i></i>
              </span>
              <input type="password" name="password" className="ipt"  placeholder='请输入密码'  onChange={inputHandler}/>
            </label>
          </li>
        </ul>
        <div className="btn-wrap" onClick={loginHandler}>
          <div className="btn">登  录</div>
        </div>
        <div className="to-reg" onClick={ toRegister }>还没有账号，去注册</div>
      </div>
    </div>
  )
}

export default connect(
  state => ({}),
  {
    saveToken
  }
)(Login);