import http from './http';



/** 根据用户表id获取表一的基础数据
 *  返回基础数据
 */

  function getworkerbasedata(userid){//传入userobj是引用类型  即引用传递 
    
    return http("get",'/getworkerbasedata',{ //http模块直接return是返回一个promise a 是 await后面跟的promise的resolve（）的直接值
        userid:userid
      })
      //     return userobj   async函数返回一个resolve(userobj)的promise 所以要返回值不能写在async函数里 
      
      
    }
  
  function updateworkerbasedatabyuserid(name,sex,area,marriage,educational,shihao,canjiagongzuoshijian,idcard,userid){
    return http("post",'/updateworkerbasedatabyuserid',{
      name:name,
      sex:sex,
      area:area,
      marriage:marriage,
      educational:educational,
      shihao:shihao,
      canjiagongzuoshijian:canjiagongzuoshijian,
      idcard:idcard,
      userid:userid
    })
  }





export {
  getworkerbasedata,
  updateworkerbasedatabyuserid 
}

