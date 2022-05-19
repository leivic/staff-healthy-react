// src/reducers/cart-reducer.js

import  { UPDATE_TO_USERINFO }  from '../actions/userinfo-actions'; //引入在action中导出的 const的那个变量

const initialState = {
  
}

export default function(state=initialState, action) {
  switch (action.type) { 
    case UPDATE_TO_USERINFO: {
      return {
        name:action.payload.name,
        userid:action.payload.userid,
        roleid:action.payload.roleid,
        token:action.payload.token
      }
    }

    default:
      return state;
  }
}