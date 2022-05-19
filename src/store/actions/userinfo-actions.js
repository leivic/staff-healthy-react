// src/actions/cart-actions.js

export const UPDATE_TO_USERINFO = 'UPDATE_TO_USERINFO';

//
export function updateToUserinfo(name,userid,roleid,token) { //定义一个action 官方的解释是action是把数据从应用传到 store 的有效载荷，它是 store 数据的唯一来源；要通过本地或远程组件更改状态，需要分发一个action
  return {
    type: UPDATE_TO_USERINFO, //描述即将要做的动作的类型
    payload: { name,userid,roleid,token } // 传递动作的数据
  }
}