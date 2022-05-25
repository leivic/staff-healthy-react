import store from '../store/store'
import App from '../components/menu'
import Table1 from '../components/table1'
import { getworkerbasedata } from '../api/api'
import { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux'
import { updateToUserinfo } from '../store/actions/userinfo-actions';
import moment from 'moment';
import table1 from '../components/table1';
const dateFormat = 'YYYY-MM';


function Stafffristlogin(props){
	//const [userid,setUserid]=useState(props.reduxdata.userinfo.userid) //从redux中读取userid
	const [userid,setUserid]=useState(sessionStorage.getItem('userid'))	
	const [userobj,setUserobj]=useState([])
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
	const clicktijiao=()=>{  //提交按钮的方法
		console.log('table1dom',table1dom)
		table1dom.current.updateworkerbasedatabyuserid(userid) //通过ref获取子组件方法 从父组件中触发子组件方法 这里传参由于是初登录页面 目前登录的userid即可
		table1dom.current.updatetablehis1byuserid(userid)
		table1dom.current.updatetablehis2byuserid(userid)
		table1dom.current.updatetablehis3byuserid(userid)
		table1dom.current.changeuserisfirstlogin(userid) //userid作为实参传入子组件方法的形参id中
	}

	useEffect(()=>{
		const fetchUserobj=async()=>{  
			const result=await getworkerbasedata(userid)//可能查不到数据 查到数据则更新 查不到数据则给个初始化的值
			if(result.length==0){ //没查到数据时给个空值
				setUserobj({  
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
			} else {
			setUserobj(result[0])} //是更新成功了的 至于为何输出为空 是因为setuserobj()是异步执行的  但是在父组件state更改之前 子组件的
			
		}
		
		fetchUserobj()  /*.then(()=>{
			console.log('Stafffristlogin-userobj',userobj) //这里的输出结果可能不如你所想的更新了 因为setstate在某些情况下是异步的
		})*/
	},[]) //



		return ( //函数式组件内部不用render（）函数
		<div>   
			<button onClick={clicktijiao}>提交数据</button>			
			<App ishidden='none' name='小白' role='员工'/> 
				<p style={{width:'45vw',margin:'0 auto'}}>xxx,首次登录，请您填写以下信息</p>
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
		</div>
		)
	
	
}

export default connect(    //从react-redux引入的方法 用于连接逻辑组件和UI组件 有了这个甚至可以省下//export default Login  
	//数据  这里的数据和方法会变成Login组件的props 
	state=>({reduxdata:state})
    )(Stafffristlogin)