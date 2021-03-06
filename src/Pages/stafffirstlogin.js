import { useNavigate } from 'react-router-dom'
import Menu from '../components/menu'
import Table1 from '../components/table1'
import { getworkerbasedata } from '../api/api'
import { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import { Button,notification,Space } from 'antd';
const dateFormat = 'YYYY-MM';


//staff 员工角色首次登录的页面


const close = () => { //antd提供通知框组件功能
	
      };
      
 



function Stafffristlogin(props){
	const navigate = useNavigate()
	//const [userid,setUserid]=useState(props.reduxdata.userinfo.userid) //从redux中读取userid
	const [userid,setUserid]=useState(sessionStorage.getItem('userid'))	
	const [userobj,setUserobj]=useState({  
		name:sessionStorage.getItem('name'),
		sex:'',
		area:'',
		marriage:'',
		educational:'',
		shihao:'',
		canjiagongzuoshijian:'',
		idcard:'',
		image:null
	    })
	const [history1arry,sethistory1arry]=useState( //即便是从ajax取值 初始数据也要进行设置 起止日期格式和userid还有name容易报错
		[{
		    userid:sessionStorage.getItem('userid'),
		    name:sessionStorage.getItem('name'),
		    kaishishijian:moment().format('YYYY-MM'),
		    jieshushijian:moment().format('YYYY-MM'),
		    gongzuodanwei:'',
		    gongzhong:'',
		    weihaiyinsu:'',
		    fanghucuoshi:''
		}]
	    ) 
	const [history2arry,sethistory2arry]=useState([
		{
		    userid:sessionStorage.getItem('userid'),
		    name:sessionStorage.getItem('name'),
		    jibingmingchen:'',
		    kaishishijian:moment().format('YYYY-MM'),
		    jieshushijian:moment().format('YYYY-MM'),
		    hospitary:'',
		    zhiliaojieguo:'',
		    beizhu:''
		}
	    ]) //初始化用来循环history2的数组
	const [history3arry,sethistory3arry]=useState([
		{
		    userid:sessionStorage.getItem('userid'),
		    name:sessionStorage.getItem('name'),
		    zhiyebingmingchen:'',
		    kaishishijian:moment().format('YYYY-MM'),
		    jieshushijian:moment().format('YYYY-MM'),
		    hospitary:'',
		    zhenduanjibie:'',
		    beizhu:'' 
		}
	    ])




	const table1dom = useRef() //通过ref实现父组件获取子组件方法  子组件要结合forwardRef,useImperativeHandle
	const clicktijiao=async ()=>{  //提交按钮的方法
		console.log('table1dom',table1dom)
		await table1dom.current.updateworkerbasedatabyuserid(userid) //通过ref获取子组件方法 从父组件中触发子组件方法 这里传参由于是初登录页面 目前登录的userid即可
		await table1dom.current.updatetablehis1byuserid(userid)
		await table1dom.current.updatetablehis2byuserid(userid)
		await table1dom.current.updatetablehis3byuserid(userid)
		await table1dom.current.changeuserisfirstlogin(userid) //userid作为实参传入子组件方法的形参id中
	
		navigate('/staffsecondlogin')  //数据更新完后跳转至另一个路由界面
	}

	const openNotification = (placement) => { //antd提供通知框组件功能 通过通知框组件里的button触发跳转提交数据跳转方法
		const key = `open${Date.now()}`;
		const btn = (
		<Space>
		  <Button type="primary" size="small" onClick={() => notification.close(key)}>
		    取消
		  </Button>		
		  <Button type="primary" size="small" onClick={async()=>{
			
			notification.close(key)
			setTimeout(() => {
			 clicktijiao();	
			}, 100);//0.1s后再执行这个方法
			}}>
		    确定
		  </Button>
		</Space>
		);
		notification.open({
		  message: '通知',
		  description:
		    '确认基本信息填写完毕?',
		  placement,
		  btn,
		  key,
		  onClose: close,
		});
	  };



	useEffect(()=>{
		
	},[]) //



		return ( //函数式组件内部不用render（）函数
		<div>   			
				<p style={{width:'45vw',margin:'0 auto'}}>{sessionStorage.getItem('name')},首次登录，请您填写以下信息</p>
			<Table1 
			input={false} 
			disabled={true} 
			userobj={userobj} 
			ref={table1dom}
			displaybutton='inline-block'
			userid={sessionStorage.getItem('userid')}
			name={sessionStorage.getItem('name')}
			history1arry={history1arry}
			history2arry={history2arry}
			history3arry={history3arry}
			/>
			<Button style={{marginLeft:'70vw'}} type="primary" onClick={()=>openNotification('top')}>提交</Button>
		</div>
		)
	
	
}

export default connect(    //从react-redux引入的方法 用于连接逻辑组件和UI组件 有了这个甚至可以省下//export default Login  
	//数据  这里的数据和方法会变成Login组件的props 
	state=>({reduxdata:state})
    )(Stafffristlogin)