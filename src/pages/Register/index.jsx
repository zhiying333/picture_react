import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { reqRegister } from '../../api'

import './index.css';

export default function Register() {

  const [isRegister, setIsRegister] = useState('none');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();

  //表单数据收集
  const formDataHandler = (event) => {
    // console.log('event', event.target.value);
    event.target.name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value);
  }

  //用户注册函数处理
  const registerHandler = async () => {

    if (!username.trim() || !password.trim()) {
      alert('亲，用户名或密码不能为空哦！')
    };

    const usernameReg = /^(?!0-9)[\u4e00-\u9fa5_a-zA-Z0-9]{2,16}/;
    const passwordReg = /[A-Za-z0-9]{4,6}/;

    if (!usernameReg.test(username)) {
      alert('用户名只能以中英文，数字，下划线组成，不能以数字开头！')
    }

    if (!passwordReg.test(password)) {
      alert('密码只能由中英文和数字组成，长度4到6位哦！');
    }

    console.log('点击用户注册', username, password);

    //发送注册请求
    let res = await reqRegister(username, password);
    console.log('res', res);

    if (res.status !== 0) {
      alert(res.message)
    } else {
      navigator('/login');
    }
  }

  return (
    <div className="register">
      <div className="login-card">
        <h2 className="title">珍照岁月，欢迎您！</h2>
        <ul className="form">
          <li className="item">
            <label className="label">
              <span className="l-tit">
                用户名：
                <i></i>
              </span>
              <input type="text" name="username" className="ipt" placeholder='请输入用户名' onChange={formDataHandler}/>
            </label>
          </li>
          <li className="item">
            <label className="label">
              <span className="l-tit">
                密 码：
                <i></i>
              </span>
              <input type="password" name="password" className="ipt" placeholder='请输入密码'  onChange={formDataHandler}/>
            </label>
          </li>
        </ul>
        <div className="btn-wrap" onClick={registerHandler}>
          <div className="btn">注  册</div>
        </div>
        {/* <div className="to-reg" onClick={ toRegister }>还没有账号，去注册</div> */}
        <div className="isRegister" style={{'display': isRegister}}>
          注册失败，请重试！
        </div>
      </div>
    </div>
  )
}
