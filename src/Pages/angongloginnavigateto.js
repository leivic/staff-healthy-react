import Angongselecttable from '../components/angongselecttable'
import { getuserdataforangongselect } from '../api/api'
import Menu from '../components/menu'
import Table1 from '../components/table1'
import { getworkerbasedata,gettablehis1,gettablehis2,gettablehis3 } from '../api/api'
import { useState,useEffect,useRef } from 'react'



function Angongloginnavigateto(props){
	const [selecttabledata,setselecttabledata]=useState('')
	const [userid,setUserid]=useState('') //接下来这个id要传入3个表中 //userid是控制几个table组件最重要的数据 因为这两个路由都是员工登录路由 员工登录后token里存的userid（账号的id）必然就是当前员工的userid 所以可以这么取 要是管理员路由这个userid是要变的	
	const [getalldata,setgetalldata]=useState(false) //是否已经获取了所有数据 ？
	const [userobj,setUserobj]=useState(false)


	const [history1arry,sethistory1arry]=useState( //即便是从ajax取值 初始数据也要进行设置 起止日期格式和userid还有name容易报错
	    
	    false) 
	const [history2arry,sethistory2arry]=useState(false
		
	     ) 
	const [history3arry,sethistory3arry]=useState(false
		
	    )
	const table1dom = useRef()    	




	const onAngongselecttablesgetkey =(id)=>{
		console.log('onAngongselecttablesgetkey-id',id) //id是个数组
		setUserid(id[0])
	}

	useEffect(async()=>{
		
		const fetchSelecttabledata=async()=>{ //重复获取相同数据组件并不会重复渲染
			getuserdataforangongselect(sessionStorage.getItem('roleid'),sessionStorage.getItem('zone')).then(
			//以当前登录的账号的权限和区域来读取后端数据 然后读在前端
				res=>{
					console.log('getuserdataforangongselect',res)
					setselecttabledata(res.data)
				}
			)
		}
		fetchSelecttabledata()

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

	},[userid])	

	return(
		<div>
			
			<div style={{width:'80vw',margin:'0 auto'}}>
				{selecttabledata !==''?<Angongselecttable data={selecttabledata} onAngongselecttablesgetkey={(id)=>onAngongselecttablesgetkey(id)}></Angongselecttable>:''}
			</div>
			<div>  {/*用多个变量控制是否渲染子组件 他们的初始值都是false 当都赋值成不是fasle后（说明从后端请求获得到了数据） 则渲染子组件*/}
			 {
			userobj!==false&history1arry!==false&history2arry!==false&history3arry!==false ?		
			<div>
			<Table1 
			input={true} 
			disabled={false} 
			userobj={userobj} 
			ref={table1dom}
			displaybutton='none' 
			userid={userid}
			name={sessionStorage.getItem('name')}
			history1arry={history1arry}
			history2arry={history2arry}
			history3arry={history3arry}
			/> 
			</div>
			:''}
			
			
		</div>


		</div>
	)
}

export default Angongloginnavigateto