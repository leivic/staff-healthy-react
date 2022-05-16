import React from 'react';
import  '../Styles/Index.css';
import { useState,useEffect,useRef } from 'react';
import { Button,Input } from 'antd';
import Avadar from './uploadimage'
import { DatePicker, Space } from 'antd';
import moment from 'moment'; //日期格式化组件
import { getworkerbasedata } from '../api/api'

const dateFormat = 'YYYY-MM';
const { RangePicker } = DatePicker;


/*getworkerbasedata(3).then(res=>{
    console.log('封装后的api',res)
})
封装后的axios的使用
*/
/*axios.get('http://127.0.0.1:7001/getworkerbasedata',{
    params:{
        userid:3
    }
}).then(
  res => {
    console.log("get res:",res);

 },error => {
    console.log("get request failed:",error);
   
 }
);axios 的直接使用 这样可以直接发起请求 但是请求多了以后太过繁琐*/





function Table1(props){

    /*数据*/
    //const [testusername,settestusername]=useState("小白") 测试使用数据
    const [userobj,setuserobj]=useState(
        {
            id:'01',
            name:'小白',
            sex:'男',
            area:'广西柳州',
            marriage:'未婚',
            educational:'本科',
            shihao:'打篮球',
            canjiagongzuoshijian:'2021-10-12',
            idcard:'532131199010230561',
            imageformdata:null
        }
    )
    const [isInputabled,setisInputadbled]=useState(props.input) //isinputeabled字段控制作为组件属性控制是否可编辑
    const [isdiabled,setisdiabled]=useState(props.disabled)     //字段作为组件属性控制组件是否可选
    const [history1arry,sethistory1arry]=useState( //即便是从ajax取值 初始数据也要进行设置 起止日期格式和userid还有name容易报错
        [{
            userid:'01',
            name:'小白',
            kaishishijian:'2021-07',
            jieshushijian:'2021-08',
            gongzuodanwei:'长安',
            gongzhong:'操作工',
            weihaiyinsu:'粉尘',
            fanghucuoshi:'口罩'
        }]
    ) //初始化用来循环histrory1的数组 常见的用法是组件外axios获取数据 
    const [history2arry,sethistory2arry]=useState([
        {
            userid:'01',
            name:'小白',
            jibingmingchen:'低温症',
            kaishishijian:'2021-05',
            jieshushijian:'2021-09',
            hospitary:'重庆第三军医院',
            zhiliaojieguo:'健康',
            beizhu:'无'
        }
    ]) //初始化用来循环history2的数组
    const [history3arry,sethistory3arry]=useState([
        {
            userid:'01',
            name:'小白',
            zhiyebingmingchen:'低温症',
            kaishishijian:'2021-05',
            jieshushijian:'2021-07',
            hospitary:'重庆第三军医院',
            zhenduanjibie:'A',
            beizhu:'无' 
        }
    ])
   /*方法*/ 
    function changeuserobj(e){  //基本数据视图绑定数据的方法
        let data=Object.assign({},userobj) //深拷贝 直接let data=userboj 不可行 因为react不能根据state的值更新state 也不能直接state.name='xxx'更新state值 如果let data=userobj data和userobj其实指向堆中同一个对象 data.name='xxx' 相当于在做username.obj=‘xxx’的操作了 所以无法更改
        data[e.target.name]=e.target.value //data.name =e.target.value 当多个input时  只能实现一个input的更改 data[e.target.name]却可以动态选择 实现多个input使用一个方法
        setuserobj(data)
    }



    function his1datepickerchange(index,date,datestring){ //更改职业病那几行日期的视图绑定数据的方法 date是moment格式的
        let data=Object.assign([],history1arry)
        data[index].kaishishijian=datestring[0]
        data[index].jieshushijian=datestring[1]
        sethistory1arry(data)
    }

    
    function his1change(index,e){//更改职业病史那几行表格的工作单位单元格触发的方法 更新state historry1div的值
        let data=Object.assign([],history1arry) //注意这里使用的是[] history1arry是数组 更新后也得更新为数组格式 不然下方.map()报错
        data[index][e.target.name]=e.target.value
        sethistory1arry(data)
    }

    function his1enterdown(index,e){ //enter敲击增加一行事件 
        console.log(e)
        let data=Object.assign([],history1arry)
        if(e.keyCode === 13 && data.length-1 === index){//如果是最后一行和按下的键是回车键
            data.push({ //数组里新增一行空数据 
                userid:data[0].userid,
                name:data[0].username,
                kaishishijian: moment().format('YYYY-MM'),
                jieshushijian: moment().format('YYYY-MM'),
                gongzuodanwei:'',
                gongzhong:'',
                weihaiyinsu:'',
                fanghucuoshi:'' 
            })
        }
        sethistory1arry(data)  //将更新的数据赋值到 state中 从而重渲染dom 更新视图 
    }
    /*function changename(e){  这样也是可以的 但是userobj整个对象被更新
        setuserobj({name:e.target.value})
    }*/
    

     /*function testchangename(e){  这样是可以的
        settestusername(e.tartget.value)
    }*/

    function his2datepickerchange(index,date,datestring){ 
        let data=Object.assign([],history2arry)
        data[index].kaishishijian=datestring[0]
        data[index].jieshushijian=datestring[1]
        sethistory2arry(data)
    }

    
    function his2change(index,e){
        let data=Object.assign([],history2arry) 
        data[index][e.target.name]=e.target.value
        sethistory2arry(data)
    }

    function his2enterdown(index,e){ 
        console.log(e)
        let data=Object.assign([],history2arry)
        if(e.keyCode === 13 && data.length-1 === index){
            data.push({ 
                userid:data[0].userid,
                name:data[0].username,
                jibingmingchen:'',
                kaishishijian:moment().format('YYYY-MM'),
                jieshushijian:moment().format('YYYY-MM'),
                hospitary:'',
                zhiliaojieguo:'',
                beizhu:''
            })
        }
        sethistory2arry(data)  
    }

    function his3datepickerchange(index,date,datestring){ 
        let data=Object.assign([],history3arry)
        data[index].kaishishijian=datestring[0]
        data[index].jieshushijian=datestring[1]
        sethistory3arry(data)
    }

    
    function his3change(index,e){
        let data=Object.assign([],history3arry) 
        data[index][e.target.name]=e.target.value
        sethistory3arry(data)
    }

    function his3enterdown(index,e){ 
        console.log(e)
        let data=Object.assign([],history3arry)
        if(e.keyCode === 13 && data.length-1 === index){
            data.push({ 
                userid:'01',
                name:'小白',
                zhiyebingmingchen:'',
                kaishishijian:moment().format('YYYY-MM'),
                jieshushijian:moment().format('YYYY-MM'),
                hospitary:'',
                zhenduanjibie:'',
                beizhu:'' 
            })
        }
        sethistory3arry(data)  
    }

    function changeimageadta(formdata){ //由子组件触发的 父组件中state改变的方法 本方法是为了改变图片数据  子组件访问父组件的形式
        let data=Object.assign({},userobj)
        data.formdata=formdata
        setuserobj(data) 
    }


    useEffect(()=>{ //当组件第一次加载 和重渲染dom时（理论上更新state，传入组件的prop改变 均会触发重渲染dom），触发useEffect副作用
        console.log(userobj)
        console.log(history1arry)
    })



    return (
        <div>
        <h2 style={{textAlign:'center'}}>劳动者个人信息卡</h2>
        <div className='flexbox'>
            <div className='basedata'>
                <div className='basedatafloat1'>
                    <div>姓名</div>
                    <div>籍贯</div>
                    <div>文化程度</div>
                    <div>参加工作时间</div>
                    <div>身份证号</div>
                </div>
                <div className='basedatamiddle'>
                    <div>
                        <div className='middlediv1'>
                            {/*<Input type='text'  disabled={isInputabled}  value={testusername} onChange={(e)=>testchangename(e)}></Input>*/}
                            <Input type='text'  disabled={isInputabled} name="name"  value={userobj.name} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                        <div className='middlediv2'>性别</div>
                        <div className='middlediv3'>
                            <Input type='text'  disabled={isInputabled} name="sex" value={userobj.sex} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                    </div>
                    <div>
                        <div className='middlediv1'>
                            <Input type='text'  disabled={isInputabled} name="area" value={userobj.area} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                        <div className='middlediv2'>婚姻</div>
                        <div className='middlediv3'>
                            <Input type='text'  disabled={isInputabled} name="marriage" value={userobj.marriage} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                    </div>
                    <div>
                        <div className='middlediv1'>
                            <Input type='text'  disabled={isInputabled} name="educational" value={userobj.educational} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                        <div className='middlediv2'>嗜好</div>
                        <div className='middlediv3'>
                            <Input type='text' disabled={isInputabled} name="shihao" value={userobj.shihao} onChange={(e)=>changeuserobj(e)}></Input>
                        </div>
                    </div>
                    <div>
                        <Input type='text' disabled={isInputabled} name="canjiagongzuoshijian" value={userobj.canjiagongzuoshijian} onChange={(e)=>changeuserobj(e)}></Input>
                    </div>
                    <div>
                        <Input type='text' disabled={isInputabled} name="idcard" value={userobj.idcard} onChange={(e)=>changeuserobj(e)}></Input>
                    </div>
                </div>
                <div className='basedataimage'>
                    <Avadar isdiabled={isdiabled} changeimage={changeimageadta}/> {/*changeimage 可在子组件中通过props取出*/}
                </div>
            </div>
            <div className='history1'>
                <div style={{height:'10%',borderBottom:'.1px solid black'}}>职业病史及健康危害史 </div>
                <div className="historydiv1">
                    <div>起止时间</div>
                    <div>工作单位</div>
                    <div>工种</div>
                    <div>接触职业病危害因素</div>
                    <div>防护措施</div>
                </div>
                {
                    history1arry.map((item,index)=>{   //根据数组循环生成html表格
                        return(
                            <div className="historydiv1">
                                
                            <div><RangePicker bordered={false}  picker="month" disabled={isInputabled} value={[moment(item.kaishishijian, dateFormat), moment(item.jieshushijian, dateFormat)]} onChange={(date,datestring)=>his1datepickerchange(index,date,datestring)}/></div>{/*这个onchange回调函数为何这样写？ 因为rangedatepicker是封装的组件 预置的回调函数就是这么个格式*/}
                            <div><Input type='text' disabled={isInputabled} name="gongzuodanwei"  value={item.gongzuodanwei} onChange={(e)=>his1change(index,e)} onKeyUp={(e)=>his1enterdown(index,e)}></Input></div>{/*标签内部的值需要和一个state绑定 input的初始值用defaultvalue属性 用value input会不可改变 */}
                            <div><Input type='text' disabled={isInputabled} name="gongzhong" value={item.gongzhong} onChange={(e)=>his1change(index,e)} onKeyUp={(e)=>his1enterdown(index,e)}></Input></div>
                            <div><Input type='text' disabled={isInputabled} name="weihaiyinsu" value={item.weihaiyinsu} onChange={(e)=>his1change(index,e)} onKeyUp={(e)=>his1enterdown(index,e)}></Input></div>
                            <div><Input type='text' disabled={isInputabled} name="fanghucuoshi" value={item.fanghucuoshi} onChange={(e)=>his1change(index,e)} onKeyUp={(e)=>his1enterdown(index,e)}></Input></div>
                        </div> 
                        )
                    })
                } 
            </div>
            <div className='history2'>
                <div style={{height:'10%',borderBottom:'.1px solid black'}}>既往病史 </div>
                    <div className="historydiv">
                        <div>疾病名称</div>
                        <div>诊断时间</div>
                        <div>诊断医院</div>
                        <div>治疗结果</div>
                        <div>备注</div>
                    </div>
                    {
                        history2arry.map((item,index)=>{
                            return(
                                <div className="historydiv">
                                <div><Input type='text' disabled={isInputabled} name="jibingmingchen" value={item.jibingmingchen} onChange={(e)=>his2change(index,e)} onKeyUp={(e)=>his2enterdown(index,e)}></Input></div>
                                <div><RangePicker bordered={false}  picker="month" disabled={isInputabled} value={[moment(item.kaishishijian, dateFormat), moment(item.jieshushijian, dateFormat)]} onChange={(date,datestring)=>his2datepickerchange(index,date,datestring)}/></div>
                                <div><Input type='text' disabled={isInputabled} name="hospitary" value={item.hospitary} onChange={(e)=>his2change(index,e)} onKeyUp={(e)=>his2enterdown(index,e)}></Input></div>
                                <div><Input type='text' disabled={isInputabled} name="zhiliaojieguo" value={item.zhiliaojieguo} onChange={(e)=>his2change(index,e)} onKeyUp={(e)=>his2enterdown(index,e)}></Input></div>
                                <div><Input type='text' disabled={isInputabled} name="beizhu" value={item.beizhu} onChange={(e)=>his2change(index,e)} onKeyUp={(e)=>his2enterdown(index,e)}></Input></div> 
                            </div>
                            )
                        })
                    }
            </div>
            <div className='diagnosis'>
            <div style={{height:'12%',borderBottom:'.1px solid black'}}>职业病诊断 </div>
                    <div className="historydiv" >
                        <div>职业病名称</div>
                        <div>诊断时间</div>
                        <div>诊断医院</div>
                        <div>诊断级别</div>
                        <div>备注</div>
                    </div>
                    {
                        history3arry.map((item,index)=>{
                            return(
                                <div className="historydiv" >
                                <div><Input type='text' disabled={isInputabled} name="zhiyebingmingchen" value={item.zhiyebingmingchen} onChange={(e)=>his3change(index,e)} onKeyUp={(e)=>his3enterdown(index,e)}></Input></div>
                                <div><RangePicker bordered={false}  picker="month" disabled={isInputabled} value={[moment(item.kaishishijian, dateFormat), moment(item.jieshushijian, dateFormat)]} onChange={(date,datestring)=>his3datepickerchange(index,date,datestring)}/></div>
                                <div><Input type='text' disabled={isInputabled} name="hospitary" value={item.hospitary} onChange={(e)=>his3change(index,e)} onKeyUp={(e)=>his3enterdown(index,e)}></Input></div>
                                <div><Input type='text' disabled={isInputabled} name="zhenduanjibie" value={item.zhenduanjibie} onChange={(e)=>his3change(index,e)} onKeyUp={(e)=>his3enterdown(index,e)}></Input></div>
                                <div><Input type='text' disabled={isInputabled} name="beizhu" value={item.beizhu} onChange={(e)=>his3change(index,e)} onKeyUp={(e)=>his3enterdown(index,e)}></Input></div> 
                                </div> 
                            )
                        })   
                    }
                    
            </div>
        </div>
        <div className='indextoolbar'>
            {/*div包裹一个float元素，div高度坍塌，给div设置为inline-block或display:flex 即可触发bfc，bfc高度计算float*/}
        </div>
        </div>
    );
     
}


export default Table1;

