import App from '../components/menu'
import Table1 from '../components/table1'

function basestaffloginsecondtime(){
	return(
		<div>
			<App ishidden='none' name='小白' role='员工'/> 
			<Table1 input={true} disabled={false}/>
		</div>
	)
}
export default basestaffloginsecondtime 