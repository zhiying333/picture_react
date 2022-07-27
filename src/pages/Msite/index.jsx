import React, { useState, useEffect } from 'react';
import { Layout, Menu, message, Avatar, Image } from 'antd'
import { PictureFilled } from '@ant-design/icons'

import './index.css';
import { reqGetCates } from '../../api';

const { Header, Sider, Content } = Layout;

export default function Msite() {
  // console.log('token', localStorage.getItem('token_key'));
  const [flag, setFlag] = useState(0);
  const [catelist, setCateList] = useState([]);

  useEffect(() => {
    getPictureCates();
    return () => {
      
    }
  }, [flag]);

  const errorMessage = (msg) => {
    message.error(msg)
  }

  const getPictureCates = async () => {
    let cateData = await reqGetCates();
    // console.log('cate', cateData);
    if (cateData.status !== 0) {
      errorMessage(cateData.message);
      return setFlag(1);
    }

    let cates = cateData.data.map( cate => {
      return {
        key: cate['_id'],
        icon: React.createElement(PictureFilled),
        label: cate['catename']
      }
    })

    setCateList(cates);
  }

  return (
    <div>
      <Layout>
        <Header>
          <div className="header">
            <h1 className='logo-wrap'><a>
              <img src="" alt="logo图" />
            </a></h1>
            <div className="user-wrap">
              <Avatar style={{width: 56, height: 56}} src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 56 }} />} />
            </div>
          </div>
        </Header>
        <Layout>
          <Sider>
            {
              <Menu
                mode='inline'
                defaultOpenKeys={['1']}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={catelist}
              />
            }
          </Sider>
          <Content></Content>
        </Layout>
      </Layout>
    </div>
  )
}
