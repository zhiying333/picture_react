import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Layout, 
  Menu, 
  message, 
  Avatar, 
  Image, 
  Popover, 
  Modal, 
  Upload,
  Input
} from 'antd'
import { PictureFilled, CaretDownFilled, PlusOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'

import './index.css';
import { reqGetCates, reqGetUserInfo, reqUpdateUsername, reqUploadPicture } from '../../api';

const { Header, Sider, Content } = Layout;

function Msite() {
  // console.log('token', localStorage.getItem('token_key'));
  const [userInfo, setUserInfo] = useState({});
  const [flag, setFlag] = useState(0);
  const [catelist, setCateList] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  // const [modalText, setModalText] = useState('Content of the modal');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [avatarUpdateStatus, setAvatarUpdateStatus] = useState({});
  const navigate = useNavigate()
  const content = (
    <div>
      <p className='edit-p' onClick={ (event) => { editHandler(event) }}>修改头像</p>
      <p className='edit-p' onClick={ (event) => { editHandler(event) }}>修改昵称</p>
      <p className='edit-p' onClick={ (event) => { editHandler(event) }}>其他信息</p>
    </div>
  )

  useEffect(() => {
    getPictureCates();
    return () => {
      
    }
  }, [flag]);

  useEffect(() => {
    getUser();
    return () => {
      
    }
  }, []);

  //获取用户信息
  const getUser = async () => {
    let userInfo = await reqGetUserInfo();

    if (userInfo.status !== 0) {
      return message.error('获取用户信息失败，请刷新重新！');
    }

    setUserInfo(userInfo.data);
    // console.log(userInfo);
  }

  //显示修改信息气泡
  const showPopoverHandle = () => {
    setPopoverVisible(!popoverVisible);
  }

  //退出登录
  const logoutHandler = () => {
    localStorage.removeItem('token_key');
    navigate('/login');
  }

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
        key: cate['_id'].toString(),
        icon: React.createElement(PictureFilled),
        label: cate['catename']
      }
    })


    setCateList(cates);
  }

  //修改用户信息
  const [username, setUsername] = useState('');

  const editHandler = (e) => {
    // console.log('e',e);
    setTitle(e.target.innerText);
    setVisible(true);
    setPopoverVisible(!popoverVisible);
  };

  const enterHandler = async () => {
    console.log('get username', username);
    if (title === '修改头像') {
      avatarUpdateStatus.status === 0 ?
      message.success('更新用户头像成功') : message.error('更新用户头像失败，请稍后重试！')
    } else if (title === '修改昵称') {
      // 验证表单数据
      if (!username.trim()) {
        return message.error('用户名不能为空');
      }

      const usernameReg = /^(?!\w)[\u4e00-\u9fa5_a-zA-Z0-9]{2,16}/;

      if (!usernameReg.test(username)) {
        console.log('~~~~');
        return message.error('用户名只能以中英文，数字，下划线组成，不能以数字开头,长度2到16位！')
      }

      //发送更新用户名请求
      let res = await reqUpdateUsername(username);

      if (res.status !== 0) {
        return message.error('更新用户名失败，请重试')
      }

      //重新获取用户信息更新用户名和用户头像
      // getUser();
    } else {

    }
    
    //重新获取用户信息更新用户名和用户头像
    getUser();
    setVisible(false);
  };

  const cancelHandler = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  //用户名修改
  const usernameHandle = ({target}) => {
    setUsername(target.value);
  }

  //头像上传

  const getBase64A = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    // console.log('file', file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 < 2;
  
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    // console.log('file', file);
  
    return isJpgOrPng && isLt2M;
  };

  const handleAvatar = (info) => {
    // console.log('avatar', info);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64A(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }

    if (info.file.response.status === 0) {
      setAvatarUpdateStatus(info.file.response)
    }
  };

  //图片上传
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
      });

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handlePictureChange = ({ fileList: newFileList }) => {
      console.log('fileList', fileList);
      setFileList(newFileList)
      if (newFileList.length >= 3) {
        console.log('点击传递了10张图');
        if (newFileList[newFileList.length - 1].status === 'done') {
          console.log('全部上传完毕');
          // let uploadStatus = await reqUploadPicture()
        }
      }
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );

    //更新头像按钮
    const uploadAvatarButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );

  return (
    <div>
      <Layout>
        <Header>
          <div className="header">
            <h1 className='logo-wrap'><a>
              <img src="" alt="logo图" />
            </a></h1>
            {
              userInfo.id ?
              <div className="user-wrap">
                <Avatar
                  style={{width: 56, height: 56}}
                  src={<Image src={userInfo.avatar ? userInfo.avatar : 'https://joeschmoe.io/api/v1/random'}
                  style={{ width: 56 }} />}
                />
                <div className="user-info">
                  <div className="username">{userInfo.username ? userInfo.username : '快来设置一个美丽的昵称吧'}</div>
                  <Popover placement="bottom" content={content} trigger="click" arrowPointAtCenter visible={popoverVisible}>
                    {/* <Button>Bottom</Button> */}
                    <CaretDownFilled style={{ fontSize: '16px', lineHeight: '64px' }} onClick={showPopoverHandle}/>
                  </Popover>
                  <div className="logout" onClick={logoutHandler}>退出登录</div>
                </div>
              </div> : <div>获取用户信息中......</div>
            }
            <Modal
              title={title}
              visible={visible}
              onOk={enterHandler}
              onCancel={cancelHandler}
            >
              {
                title === '修改昵称' ?
                <Input placeholder="请输入新的用户名" prefix={<UserOutlined />} onChange={usernameHandle}/> :
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  headers={{ ContentType: 'multipart/form-data', Authorization: localStorage.getItem('token_key')}}
                  showUploadList={false}
                  action="http://127.0.0.1:3030/picture/updateAvatar"
                  beforeUpload={beforeUpload}
                  onChange={handleAvatar}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadAvatarButton
                  )}
                </Upload>
              }
            </Modal>
          </div>
        </Header>
        <Layout>
          <Sider>
            {
              catelist.length ?
              <Menu
                mode='inline'
                defaultSelectedKeys={[catelist[0].key]}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={catelist}
              /> : <div>获取分类中</div>
            }
          </Sider>
          <Content style={{ padding: '10px' }}>
            <Upload
              action="http://127.0.0.1:3030/picture/upload"
              listType="picture-card"
              headers={{ ContentType: 'multipart/form-data', Authorization: localStorage.getItem('token_key')}}
              fileList={fileList}
              name="img"
              onPreview={handlePreview}
              onChange={handlePictureChange}
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default connect(
  state => ({
    
  }),
  {}
)(Msite);