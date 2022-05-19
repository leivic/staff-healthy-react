// src/reducers/cart-reducer.js

import  { ADD_TO_CART }  from '../actions/cart-actions'; //引入在action中定义的action方法

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
}
//redux规定一个reducer必须是一个纯函数，结果是可预料的 结果只依赖于传入的参数
export default function(state=initialState, action) {//state定义存储在store中的数据 store中的数据可以直接获取 但是更新store中数据的操作只能用reducer中定义的方法  action发出了做某件事的请求，只是描述了要做某件事，并没有去改变state来更新界面，reducer就是根据action的type来处理不同的事件
  switch (action.type) { 
    case ADD_TO_CART: {
      return {
              //...是扩展运算符  用于对象是遍历取出对象里面所有可遍历键值对，拷贝到当前对象中
        cart: [...state.cart, action.payload] // ...用于数组是取出数组中所有可遍历变量，一个个拷贝到新的数组中
      }
    }

    default:
      return state;
  }
}
