//staff 员工角色非首次登录的页面

import App from '../components/menu'
import Table1 from '../components/table1'
import { getworkerbasedata,gettablehis1,gettablehis2,gettablehis3 } from '../api/api'
import { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux'



function Staffsecondlogin(props){
	
	const [getalldata,setgetalldata]=useState(false) //是否已经获取了所有数据 ？
	const [userid,setUserid]=useState(sessionStorage.getItem('userid'))	
	const [userobj,setUserobj]=useState(false)


	const [history1arry,sethistory1arry]=useState( //即便是从ajax取值 初始数据也要进行设置 起止日期格式和userid还有name容易报错
	    
	    false) 
	const [history2arry,sethistory2arry]=useState(false
		
	     ) 
	const [history3arry,sethistory3arry]=useState(false
		
	    )
	const table1dom = useRef()    

	useEffect(async ()=>{
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
		const fetchTablehis1=async()=>{
			const result=await gettablehis1(userid)
			sethistory1arry(result.data)	
		} //  这两种获取数据的方法 都会引起页面抖动 子组件先渲染props传过去的初始值，再获取数据更新值 页面就会刷新两次	 所以为了解决这个问题 要先更新父组件state值 再渲染子组件传父组件更新后的state作为props值过去  
		//table1dom.current.gettablehis1(userid) //直接触发子组件方法以更新子组件数据 来获得基础数据 这里和上面getworkerbasedata是两种不同的获得数据的方法 一种在父组件获得数据 通过props传入子组件 一种直接在子组件触发方法获得数据
		//table1dom.current.gettablehis2(userid)
		//table1dom.current.gettablehis3(userid)
		const fetchTablehis2=async()=>{
			const result=await gettablehis2(userid)
			sethistory2arry(result.data)
			
		}
		const fetchTablehis3=async()=>{
			const result=await gettablehis3(userid)
			sethistory3arry(result.data)	
		}	
		fetchUserobj()  /*.then(()=>{
			console.log('Stafffristlogin-userobj',userobj) //这里的输出结果可能不如你所想的更新了 因为setstate在某些情况下是异步的
		})*/
		fetchTablehis1()
		fetchTablehis2()
		fetchTablehis3()
		
	},[]) //



		return ( //函数式组件内部不用render（）函数
		<div>  {/*用多个变量控制是否渲染子组件 他们的初始值都是false 当都赋值成不是fasle后（说明从后端请求获得到了数据） 则渲染子组件*/}
			 {
			userobj!==false&history1arry!==false&history2arry!==false&history3arry!==false ?		
			<div>
			<App ishidden='none' name='小白' role='员工'/> 
				<p style={{width:'45vw',margin:'0 auto'}}>xxx,首次登录，请您填写以下信息</p>
			<Table1 
			input={true} 
			disabled={false} 
			userobj={userobj} 
			ref={table1dom}
			displaybutton='none' 
			userid={sessionStorage.getItem('userid')}
			name={sessionStorage.getItem('name')}
			history1arry={history1arry}
			history2arry={history2arry}
			history3arry={history3arry}
			/> 
			</div>
			:''}
			
			
		</div>
		)
	
	
}

export default connect(    //从react-redux引入的方法 用于连接逻辑组件和UI组件 有了这个甚至可以省下//export default Login  
	//数据  这里的数据和方法会变成Login组件的props 
	state=>({reduxdata:state})
    )(Staffsecondlogin)