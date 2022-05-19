// src/store.js 

import { legacy_createStore as createStore } from "redux";
import rootReducer from './reducers'; //没有写到index.js 是因为会自动引用到index文件

let store = createStore(rootReducer);

export default store;
