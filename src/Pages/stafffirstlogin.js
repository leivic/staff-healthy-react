import store from '../store/store'
import App from '../components/menu'
import Table1 from '../components/table1'
import { getworkerbasedata } from '../api/api'
import { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux'
import { updateToUserinfo } from '../store/actions/userinfo-actions';




function Stafffristlogin(props){
	const [userid,setUserid]=useState(props.reduxdata.userinfo.userid) //从redux中读取userid
	const [userobj,setUserobj]=useState([])

	

	useEffect(()=>{
		const fetchUserobj=async()=>{  
			const result=await getworkerbasedata(userid) 
			setUserobj(result[0]) //是更新成功了的 至于为何输出为空 是因为setuserobj()是异步执行的 
			
		}
		
		fetchUserobj()  /*.then(()=>{
			console.log('Stafffristlogin-userobj',userobj) //这里的输出结果可能不如你所想的更新了 因为setstate在某些情况下是异步的
		})*/
	},[]) //



		return ( //函数式组件内部不用render（）函数
		<div>   
			<button></button>			
			<App ishidden='none' name='小白' role='员工'/> 
				<p style={{width:'45vw',margin:'0 auto'}}>xxx,首次登录，请您填写以下信息</p>
			<Table1 input={false} disabled={true} userobj={userobj}/>
		</div>
		)
	
	
}

export default connect(    //从react-redux引入的方法 用于连接逻辑组件和UI组件 有了这个甚至可以省下//export default Login  
	//数据  这里的数据和方法会变成Login组件的props 
	state=>({reduxdata:state})
    )(Stafffristlogin)