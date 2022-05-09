import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Index from './Pages/Index'
import Stafffirstlogin from './Pages/stafffirstlogin'
import List from './Pages/List'
import Tablebox2 from './Pages/tablebox2'
import Basestaffloginsecondtime from'./Pages/basestafflogin'
import Login from './Pages/login'

function AppRouter() {
  return (
    <Router>
        <Routes>{/*Router也是个组件 内部可以路由切换组件*/}
          <Route path="/"  element={<Index/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/stafffirstlogin/"  element={<Stafffirstlogin/>} />
          <Route path="/list/" element={<List/>} />
          <Route path="/tablebox2/" element={<Tablebox2/>} />
          <Route path="/basestaffloginsecondtime/" element={<Basestaffloginsecondtime/>} />
        </Routes>
    </Router>
  );
}

export default AppRouter; 