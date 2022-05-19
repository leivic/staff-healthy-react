// src/actions/cart-actions.js

export const ADD_TO_CART = 'ADD_TO_CART';

//
export function addToCart(product, quantity, unitCost) { //定义一个action 官方的解释是action是把数据从应用传到 store 的有效载荷，它是 store 数据的唯一来源；要通过本地或远程组件更改状态，需要分发一个action
  return {
    type: ADD_TO_CART, //描述即将要做的动作
    payload: { product, quantity, unitCost } // 传递动作的数据
  }
}
