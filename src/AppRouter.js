import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Index from './Pages/Index'
import Firstloginstaff from './Pages/staffloginfirsttime'
import List from './Pages/List'
import Tablebox2 from './Pages/tablebox2'
function AppRouter() {
  return (
    <Router>
        <Routes>
          <Route path="/"  element={<Index/>} />
          <Route path="/firstloginstaff/"  element={<Firstloginstaff/>} />
          <Route path="/list/" element={<List/>} />
          <Route path="/tablebox2/" element={<Tablebox2/>} />
        </Routes>
    </Router>
  );
}

export default AppRouter;