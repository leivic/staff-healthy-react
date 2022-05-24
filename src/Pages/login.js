import React from "react";
import { Form, Input, Button, Checkbox } from 'antd'; //从antd导入的组件 
import axios from "axios";
import { connect } from 'react-redux'  //connect是来自react-redux库的连接逻辑组件和ui组件的容器
import { updateToUserinfo }  from '../store/actions/userinfo-actions' //veiw触发action以更新store中的数据
import { useNavigate } from 'react-router-dom'



//访问后端登录接口的api 
//===================================================================================================
async function getuserinfo(username,password){   //为什么要单独写一个axios呢？ 因为封装axios的api已经被我
    return await axios.post('http://127.0.0.1:7001/login',{ //不加return 本函数内返回undefined 加了return才是返回一个promise 
		username:username,
		password:password
	}).then(res=>{
		console.log('getuserinfo',res)
		return res
	})
	
}
//================================================================================================

function Login(props){ //通过react-redux的库封装 将下方connect中的action和state添加到组件的props上
	      const navigate = useNavigate() //react-v6使用的
//antd <Form> 组件封装的onFinish回调 登录成功时，存储token 存储redux数据 页面跳转等操作		      
//=============================================================================================================================
	      const onFinish = (values) => { //antd组件封装的回调方法 values是 <Form.item></Form.item>元素下面的所有对象
		getuserinfo(values.username,values.password).then( 
			res=>{ //首先判断返回的数据 是否查询到了对应数据
				console.log(res)
				if(res.data.userinfo.length==0){//假如没有查询到对应数据
					alert("登录失败，请检查账号密码")
				}else{//查询到了对应数据
					props.updateToUserinfo(res.data.userinfo[0].name,res.data.userinfo[0].id,res.data.userinfo[0].roleid,res.data.token) //调用redux action  将查询到的信息添加到redux上
					sessionStorage.setItem('jwttoken',res.data.token)//将token存储在session中
					sessionStorage.setItem('name',res.data.userinfo[0].name)
					sessionStorage.setItem('userid',res.data.userinfo[0].id)	
					return res
				}
			}
		).then((res)=>{
			//console.log('reduxdata',props.reduxdata) 这样可以取到store中的state，但是却是更新之前的state
			axios.get('http://127.0.0.1:7001/testtoken') //测试用的接口 直接这样访问 提示401 需要token认证
			switch(res.data.userinfo[0].roleid){//登录成功后 根据登录用户不同的权限跳转向不同的页面
				case 1:
					if(res.data.userinfo[0].isfirstlogin==0){ //当员工第一次登录
						console.log('props',props.history)
						// window.location.href = "/stafffirstlogin" 也可跳转 但是跳转后是重载页面程序 redux里的数据丢失成初始化的结果 session里的token没丢失 是因为session是浏览器提供的api  所以token仍然没丢失 
						navigate('/stafffirstlogin') //路由更新 程序并没有重载 redux里的数据能不会丢失
						
					}else if(res.data.userinfo[0].isfirstlogin==1){//当员工不是第一次登录

					}
				break;
			}
		})

	      };
//========================================================================================================================	    
	      const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	      };
	      
	      

	      return (
		<Form
		  name="basic"
		  labelCol={{
		    span: 8,
		  }}
		  wrapperCol={{
		    span: 8,
		  }}
		  initialValues={{
		    remember: true,
		  }}
		  onFinish={onFinish}
		  onFinishFailed={onFinishFailed}
		  autoComplete="off"
		 
		>
		  <Form.Item
		    label="Username"
		    name="username"
		    rules={[
		      {
			required: true,
			message: 'Please input your username!',
		      },
		    ]}
		  >
		    <Input />
		  </Form.Item>
	    
		  <Form.Item
		    label="Password"
		    name="password"
		    rules={[
		      {
			required: true,
			message: 'Please input your password!',
		      },
		    ]}
		  >
		    <Input.Password />
		  </Form.Item>
	    
		  <Form.Item
		    name="remember"
		    valuePropName="checked"
		    wrapperCol={{
		      offset: 8,
		      span: 16,
		    }}
		  >
		    <Checkbox>Remember me</Checkbox>
		  </Form.Item>
	    
		  <Form.Item
		    wrapperCol={{
		      offset: 8,
		      span: 16,
		    }}
		  >
		    <Button type="primary" htmlType="submit">
		      Submit
		    </Button>
		  </Form.Item>
		</Form>
	      );
}

//react-redux 引入的connect方法 用于连接ui组件（本页面Login组件） 和逻辑组件 （库封装的顶层Provider组件）
//===================================================================================================================
export default connect(    //从react-redux引入的方法 用于连接逻辑组件和UI组件 有了这个甚至可以省下//export default Login  
	//数据  这里的数据和方法会变成Login组件的props 
	state=>({reduxdata:state}),
	//方法
	{
		updateToUserinfo
	}
    )(Login)
//============================================================================================================
//export default Login; 