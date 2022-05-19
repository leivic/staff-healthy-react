/* src/index.js  

import { legacy_createStore as createStore } from "redux"; //从redux包中引入createStore方法
import { combineReducers } from 'redux';

const productsReducer = function(state=[], action) { //创建一个reducer 第一个参数state是保存在store中的数据 action是操作store中state数据的容器
  return state;
}

const cartReducer = function(state=[], action) {
  return state;
}

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers); //一个store中使用多个reducer

let store = createStore(rootReducer); //创建一个store存储区 存储区的数据可以直接被访问，但是只能通过reducer提供的方法更新
*/