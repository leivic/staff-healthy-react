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

  function gettablehis1(userid){//传入userobj是引用类型  即引用传递 
    
    return http("get",'/gettablehis1',{ //http模块直接return是返回一个promise a 是 await后面跟的promise的resolve（）的直接值
        userid:userid
      })
      //     return userobj   async函数返回一个resolve(userobj)的promise 所以要返回值不能写在async函数里 
      
    }
  
  function updatetablehis1byuserid(userid,hisarraylength,name,kaishishijian,jieshushijian,gongzuodanwei,gongzhong,weihaiyinsu,fanghucuoshi){
    return http("post",'/updatetablehis1byuserid',{
      userid:userid,
      name:name,
      kaishishijian:kaishishijian,
      jieshushijian:jieshushijian,
      gongzuodanwei:gongzuodanwei,
      gongzhong:gongzhong,
      weihaiyinsu:weihaiyinsu,
      fanghucuoshi:fanghucuoshi,
      hisarraylength:hisarraylength
    })
  }

  function gettablehis2(userid){//传入userobj是引用类型  即引用传递 
    
    return http("get",'/gettablehis2',{ //http模块直接return是返回一个promise a 是 await后面跟的promise的resolve（）的直接值
        userid:userid
      })
      //     return userobj   async函数返回一个resolve(userobj)的promise 所以要返回值不能写在async函数里 
      
    }
  
  function updatetablehis2byuserid(userid,hisarraylength,name,jibingmingchen,kaishishijian,jieshushijian,hospitary,zhiliaojieguo,beizhu){
    return http("post",'/updatetablehis2byuserid',{
      userid:userid,
      hisarraylength:hisarraylength,
      name:name,
      jibingmingchen:jibingmingchen,
      kaishishijian:kaishishijian,
      jieshushijian:jieshushijian,
      hospitary:hospitary,
      zhiliaojieguo:zhiliaojieguo,
      beizhu:beizhu
    })
  }

  function gettablehis3(userid){//传入userobj是引用类型  即引用传递 
    
    return http("get",'/gettablehis3',{ //http模块直接return是返回一个promise a 是 await后面跟的promise的resolve（）的直接值
        userid:userid
      })
      //     return userobj   async函数返回一个resolve(userobj)的promise 所以要返回值不能写在async函数里 
      
    }
  
  function updatetablehis3byuserid(userid,hisarraylength,name,zhiyebingmingchen,kaishishijian,jieshushijian,hospitary,zhenduanjibie,beizhu){
    return http("post",'/updatetablehis3byuserid',{
      userid:userid,
      hisarraylength:hisarraylength,
      name:name,
      zhiyebingmingchen:zhiyebingmingchen,
      kaishishijian:kaishishijian,
      jieshushijian:jieshushijian,
      hospitary:hospitary,
      zhenduanjibie:zhenduanjibie,
      beizhu:beizhu
    })
  }

  function changeuserisfirstlogin(id,isfirstlogin){
    return http("get",'/changeuserisfirstlogin',{ //http模块直接return是返回一个promise a 是 await后面跟的promise的resolve（）的直接值
      id:id,
      isfirstlogin:isfirstlogin
    }) 
  }


export {
  getworkerbasedata,
  updateworkerbasedatabyuserid,
  gettablehis1,
  updatetablehis1byuserid,
  gettablehis2,
  updatetablehis2byuserid,
  gettablehis3,
  updatetablehis3byuserid,
  changeuserisfirstlogin
}

