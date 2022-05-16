import http from './http';



/**
 * 获取根据用户id获取起初数据
 */
function getworkerbasedata(userid){
  return  http("get",'/getworkerbasedata',{
    params:{
        userid:userid
    }
});
}



export {
	getworkerbasedata
}

