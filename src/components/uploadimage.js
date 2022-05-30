import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import ImgCrop from 'antd-img-crop';
import { getavatar } from '../api/api' //从后端获得图片的方法
//upload组件会将上传文件封装 originFileObj才是源文件
//beforeUpload 传入的file 才是源数据
//upload组件的上传文件格式为二进制数据流 FormData形式
//onChange方法中传入的fileList则是Upload自己需要的封装后的数据


function getBase64(img, callback) {  //这个方法是获取刚刚上传成功的组件的base64数据 而不能从后端读一个base64数据过来
  const reader = new FileReader();
  console.log('getBase64-reader',reader)
  reader.addEventListener('load', () => callback(reader.result)); //reader.result作为实参传入callback函数的形参imageUrl里
  reader.readAsDataURL(img);
}
//beforeUpload传入的file是源数据
function beforeUpload(file) { //beforeupload是antd的upload组件中封装的一个函数钩子 此处是限制传入的文件类型和文件大小
  console.log('beforeUpload-file',file)//传入一个file对象的源数据
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传 JPG/PNG 格式的文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M; //返回传入的文件格式和和大小
}

class Avatartest extends React.Component {
  constructor(props){ //传入组件的props
	  super(props)
	  this.state={
		loading: true,  //本组件的状态仅有一个loading 
	  }
  }
  

  handleChange = info => { //当组件状态改变时  上传成功这个方法会执行两次 一次info.file.status === 'uploading' 一次(info.file.status === 'done')
    console.log('handlechange-info',info) //info是一个{file:{},filelist:[]} 这个file也不是beforeUpload中的源数据 是封装后的file file中封装的originFileObj属性才是beforeUpload中的源数据 
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
      );//一个方法传入了两个参数
    }
  };
  
  /*onImgFilesChange = file => { 
      let formData = new FormData();
      formData.append('file', file.file);
      this.props.changeimage(formData) //通过props访问父组件中的方法  将formData数据入父组件的state中
 }*/
 componentDidMount() { //react生命周期 当组件挂载时
  getavatar(this.props.userid).then(res=>{ //res是根据id获得的 base64数据
    console.log('upload-image,getbase64data',res)
    this.setState({
      imageUrl:res.data,
      loading: false,
    })
  })
}

shouldComponentUpdate(nextProps){  //没有这个生命周期的话 类似angongloginnavigateto 页面切换选中的员工时 子组件的子组件内数据就不会更新
  // 比较之前的userid和传来的userid是否相同，如果相同，不重新render; 如果不相同，重新render 减少重复渲染
    return nextProps.userid!==this.props.userid
}

componentDidUpdate(nextProps) {
  getavatar(nextProps.userid).then(res=>{ //res是根据id获得的 base64数据
    console.log('upload-image,getbase64data',res)
    console.log('nextProps.userid',nextProps.userid)
    this.setState({
      imageUrl:res.data,
      loading: false,
    })
  })
}



  render() {
    const { loading, imageUrl } = this.state; //解构获取state里的两个状态
    const uploadButton = (   //根据state loading的值决定这个react元素返回的样式
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
		  action="http://127.0.0.1:7001/uploadavatar"
		  disabled="true"
		>
		  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : ""} 
		</Upload>
	      ); 
    }
    return (
      //  upload组件是antd封装的受控组件 需要onchange()才能上传 同时已封装数据输送到后端的功能 如果使用action属性 会传输上传的数据到action描述的后端接口
      <ImgCrop rotate> 
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          data={{userid:this.props.userid}}   
          /*默认上传所需额外参数的对象或者回一个额外参数对象的方法 我的后端上传方法http://127.0.0.1:7001/uploadavatar 需要两个参数 一个formdata格式的file 一个formdata格式的userid file是action方式默认上传的 所以这里我要加上一个userid的额外参数*/
          action="http://127.0.0.1:7001/uploadavatar"
          /*upload默认的上传地址*/
          beforeUpload={beforeUpload}
          /*beforeUpload上传文件之前的钩子，参数为上传的文件file，若返回 false 则停止上传*/
          onChange={this.handleChange}
          /*上传的文件更改事件*/
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          {/*根据当前组件中的state有没有imageurl 判断返回的组件样式 有的话就返回一个 img标签（src属性获得base64数据可以展示出图片） ,没有的话就展示之前定义的uploadButtonreact元素就是那个加号*/}
        </Upload>
      </ImgCrop>
      /*
     <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={this.onImgFilesChange} 
     >{/*upload组件默认的上传行为是使用actionz和onchange customRequest也是antd预定义的函数回调 用来覆盖默认的上传行为
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
     </Upload>
    */
    );
  }
}

export default Avatartest 