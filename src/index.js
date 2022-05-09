//index.js 是react项目的入口文件 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //引入全局样式到入口文件
import AppRouter from './AppRouter';
import { Layout } from 'antd'; 
const { Header, Footer, Sider, Content } = Layout; //ant-design组件

ReactDOM.render( //App ishidden属性判断文本框是否隐藏 
  <div>
    <Layout>
      <Header></Header>
      <Content>
        <AppRouter/>
      </Content>
      <Footer></Footer>
    </Layout>
  </div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
