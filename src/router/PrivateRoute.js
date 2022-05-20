//版本落后  以下代码写在这里思路以供参考 但是并没有使用
import React from "react";
import { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

function Redirect({ to }) {
	let navigate = useNavigate();
	useEffect(() => {
	  navigate(to);
	});
	return null;
      }


function PrivateRoute(props) {//使用私有路由时，能取到token则跳转到对应路由 没取到就重定向到登录页
  const isLogin = localStorage.getItem("token") ? true : false;
  return isLogin ? (
    <Route
      path={props.path}
      element={() => <props.component></props.component>}
    ></Route>
  ) : (
    <Redirect to="/" />
  );
}

export default PrivateRoute;
