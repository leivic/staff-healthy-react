import React from "react";
import { BrowserRouter as Router, Route,Routes,Navigate } from "react-router-dom";
import Stafffirstlogin from './Pages/stafffirstlogin'
import Staffsecondlogin from './Pages/staffsecondlogin'
import Angongloginnavigateto from './Pages/angongloginnavigateto' 
/*import List from './Pages/List'
import Tablebox2 from './Pages/tablebox2'
import Basestaffloginsecondtime from'./Pages/basestafflogin'*/
import Login from './Pages/login'
//import Privateroute from './router/PrivateRoute'   react-dom-v5以下的方案 用一个封装的路由组件实现鉴定token权限路由

//定义路由拦截器
//========================================================================================================
// RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
function RequireAuth({ children }) {
  let isLogin = sessionStorage.getItem('jwttoken')==null ? 'false' : 'true'; //session 是浏览器提供的存储数据在浏览器中的api  常用来做登录鉴权 存储token
  return isLogin === 'true' ? ( // 判断 localstorage 中登录状态是否为 true
    children
  ) : (
    <Navigate to="/" replace /> // 跳转到登录
  );
}
//=========================================================================================================

//配置路由及路由返回组件 
//==========================================================================================================
function AppRouter() {
  return (
    <Router>
        <Routes>{/*Router也是个组件 内部可以路由切换组件*/}
          <Route path="/"  element={<Login/>} /> {/*登录界面*/}
          <Route path="/stafffirstlogin/"  element={
             <RequireAuth>              {/*拦截组件*/}
              <Stafffirstlogin/>        {/*被拦截组件*/}
             </RequireAuth> 
          } />{/*员工第一次登录界面 私有路由*/}
          {/*<Privateroute path="/stafffirstlogin" component={<Stafffirstlogin/>}></Privateroute> {/*使用封装的私有路由组件,无token不能进入这个路由*/}
          
          
          
          <Route path="/staffsecondlogin/"  element={
             <RequireAuth>              {/*拦截组件*/}
              <Staffsecondlogin/>        {/*被拦截组件*/}
             </RequireAuth> 
          } />{/*员工非第一次登录界面 私有路由*/}
        
          <Route path="/angongloginnavigateto/"  element={
             <RequireAuth>              {/*拦截组件*/}
              <Angongloginnavigateto/>        {/*被拦截组件*/}
             </RequireAuth> 
          } />{/*安工登录访问路由登录界面 私有路由*/}
        
      
      
      
      </Routes>
        
    </Router>
  );
}
//=============================================================================================================
export default AppRouter; 