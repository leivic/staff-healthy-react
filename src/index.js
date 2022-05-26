//index.js 是react项目的入口文件  访问一个个组件都是从index.js进去的 所以渲染组件的render()方法也写在这个文件
import store from './store/store.js';   //引入store 测试redux
import { addToCart }  from './store/actions/cart-actions'; //引入定义的action 测试redux
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //引入全局样式到入口文件
import AppRouter from './AppRouter';
import {Provider} from "react-redux";  //react-redux库和redux库是两种东西 redux库是可以用在其他js程序中的，在react中也可以使用 但是react-redux可以方便地把react和redux联系在一起  用法也和只用redux不同
import { Layout } from 'antd'; 

//redux store的3个方法测试redux功能
//==================================================================================================
console.log("initial state: ", store.getState()); //先看一下目前store里面的数据

 store.subscribe(() =>             //监听每次store中任意状态的变化，执行方法中定义的函数回调
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250)); //分发store中某个更新数据的方法 来更新redux中的数据
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));
//===================================================================================================


//react render()方法渲染的顶层react元素  
//====================================================================================================
ReactDOM.render( //App ishidden属性判断文本框是否隐藏 
 <Provider store={store}> {/*使用react-redux必要的一步  store中的数据都被存在顶层组件中了*/}
  <div>
   {/* <Layout>
      <Header></Header>
      <Content>
        <AppRouter/>
      </Content>
      <Footer></Footer>
    </Layout>*/}
    <AppRouter/>
    
   </div>
  </Provider>
  ,
  document.getElementById('root')
);
//====================================================================================================
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
