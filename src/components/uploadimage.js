import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) { //beforeupload是antd的upload组件中封装的一个函数钩子 此处是限制传入的文件类型和文件大小
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传 JPG/PNG 格式的文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  constructor(props){ //传入组件的props
	  super(props)
	  this.state={
		loading: false, 
	  }
  }
  

  handleChange = info => { //
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  
  onImgFilesChange = file => { 
      let formData = new FormData();
      formData.append('file', file.file);
      this.props.changeimage(formData) //通过props访问父组件中的方法
 }

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div >Upload</div>
      </div>
    );
    if(this.props.isdiabled ==false){ //传入组件的prop不同，返回的组件不同
	    return (
		<Upload
		  name="avatar"
		  listType="picture-card"
		  className="avatar-uploader"
		  showUploadList={false}
		  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
		  disabled="true"
		>
		  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : ""} 
		</Upload>
	      ); 
    }
    return (
      /*  upload组件是antd封装的受控组件 需要onchange()才能上传 同时已封装数据输送到后端的功能 如果使用action属性 会传输上传的数据到action描述的后端接口
      <Upload
	      name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      */
     <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={this.onImgFilesChange} 
     >{/*upload组件默认的上传行为是使用action和onchange customRequest也是antd预定义的函数回调 用来覆盖默认的上传行为*/}
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
     </Upload>
    );
  }
}

export default Avatar