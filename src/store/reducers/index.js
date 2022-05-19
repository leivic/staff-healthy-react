//整合创建的所有不同reducer的文件

// src/reducers/index.js

import { combineReducers } from 'redux'; //通过redux库中的combineReducers方法整合多个reducer
import productsReducer from './product-reducer';
import cartReducer from './cart-reducer';
import userReducer from './user-reducer';

const allReducers = {         //整个store中state的数据格式即如下
  userinfo: userReducer,
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
