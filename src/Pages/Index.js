import React from 'react';
import  '../Styles/Index.css';
import { useState,useEffect,useRef } from 'react';
import { Button } from 'antd';
import Avadar from '../components/uploadimage'
import { DatePicker, Space } from 'antd';
import { connect } from 'react-redux'
import { addToCart }  from '../store/actions/cart-actions'



const { RangePicker } = DatePicker;
function Index(props){

    const obj1={
        name:'小白',
        sex:'男',
        area:'广西柳州',
        marriage:'未婚',
        educational:'本科',
        idcard:'532131199010230561'
    }
    const [isInputabled,setisInputadbled]=useState(true)
    const [change,setchange]=useState('修改')
    const [isdiabled,setisdiabled]=useState(false)
    const nameInput = useRef(null); //函数组件声明ref 用useRef hooks 默认函数组件没有ref
    const sexInput = useRef(null);
    const areaInput =useRef(null);
    const marriageInput=useRef(null);
    const educationalInput =useRef(null);
    const idcardInput=useRef(null);
    function changeinput(){
        if(isInputabled ==true){
            setisInputadbled(false)
            setisdiabled(true)
            setchange('上传') //state的改变会触发render()函数重渲染dom
        }else if(isInputabled ==false){
            setisInputadbled(true)
            setisdiabled(false)
            setchange('修改') 
        }
    }

    useEffect(()=>{ //当重渲染dom时，触发useEffect副作用
        console.log('testreduxdata',props.testreduxdata)
        console.log(nameInput.current.value)
    })

    function changename(){
        let name=nameInput.current.value
        //axios.get({param:{name:'小白'}}).then(res=>{})
        if(nameInput.current.value==obj1.name){
            sexInput.current.value=obj1.sex
            areaInput.current.value=obj1.area
            marriageInput.current.value=obj1.marriage
            educationalInput.current.value=obj1.educational
            idcardInput.current.value=obj1.idcard 
        }
    }
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
                            <input type='text' onChange={changename} ref={nameInput} disabled={isInputabled}></input>
                        </div>
                        <div className='middlediv2'>性别</div>
                        <div className='middlediv3'>
                            <input type='text' ref={sexInput} disabled={isInputabled}></input>
                        </div>
                    </div>
                    <div>
                        <div className='middlediv1'>
                            <input type='text' ref={areaInput} disabled={isInputabled}></input>
                        </div>
                        <div className='middlediv2'>婚姻</div>
                        <div className='middlediv3'>
                            <input type='text' ref={marriageInput} disabled={isInputabled}></input>
                        </div>
                    </div>
                    <div>
                        <div className='middlediv1'>
                            <input type='text' ref={educationalInput} disabled={isInputabled}></input>
                        </div>
                        <div className='middlediv2'>嗜好</div>
                        <div className='middlediv3'>
                            <input type='text' disabled={isInputabled}></input>
                        </div>
                    </div>
                    <div>
                        <input type='text' disabled={isInputabled}></input>
                    </div>
                    <div>
                        <input type='text' ref={idcardInput} disabled={isInputabled}></input>
                    </div>
                </div>
                <div className='basedataimage'>
                    <Avadar isdiabled={isdiabled} /> 
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
                <div className="historydiv1">
                
                    <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                </div>
                <div className="historydiv1">
                    <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                </div>
                <div className="historydiv1">
                    <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                </div>
                <div className="historydiv1">
                    <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                    <div><input type='text' disabled={isInputabled}></input></div>
                </div> 
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
                    <div className="historydiv">
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div> 
                    </div>
                    <div className="historydiv">
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                    </div>
                    <div className="historydiv">
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                    </div>
                    <div className="historydiv">
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                    </div> 
            </div>
            <div className='diagnosis'>
            <div style={{height:'12%',borderBottom:'.1px solid black'}}>职业病诊断 </div>
                    <div className="historydiv" style={{height:'22%'}}>
                        <div>职业病名称</div>
                        <div>诊断时间</div>
                        <div>诊断医院</div>
                        <div>诊断级别</div>
                        <div>备注</div>
                    </div>
                    <div className="historydiv" style={{height:'22%'}}>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div> 
                    </div>
                    <div className="historydiv" style={{height:'22%'}}>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                    </div>
                    <div className="historydiv" style={{height:'22%'}}>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><RangePicker bordered={false}  picker="month" disabled={isInputabled}/></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                        <div><input type='text' disabled={isInputabled}></input></div>
                    </div>
                    
            </div>
        </div>
        <div className='indextoolbar'>
            <Button type="primary" style={{float:'right'}} onClick={changeinput}>{change}</Button> {/*div包裹一个float元素，div高度坍塌，给div设置为inline-block或display:flex 即可触发bfc，bfc高度计算float*/}
        </div>
        </div>
    );
     
}

export default connect(   
    //数据
    state=>({testreduxdata:state}),
    //方法
    {
        addToCart
    }
)(Index)



