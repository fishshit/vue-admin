import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method:'post',
        url:'/getSms/',
        data
    })
}

 /**
  * 获取用户角色
  */
 
 /**
  * 登陆
  */

 /**
  * 注册
  */