import React, { useState } from 'react'

export default function UploadComponent() {

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

  return (
    <div>
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
    </div>
  )
}
