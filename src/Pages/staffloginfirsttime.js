import { render } from "@testing-library/react";

import Table1 from '../components/table1'

function stafffristlogin(){
	
		return ( //函数式组件内部不用render（）函数
		<div>
		<p style={{width:'45vw',margin:'0 auto'}}>xxx,首次登录，请您填写以下信息</p>
		<Table1 input={false} disabled={true}/>
		</div>
		)
	
	
}

export default stafffristlogin