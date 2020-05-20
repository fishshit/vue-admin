/*
过滤特殊字符
*/
/*密码 */
export function validatepassWord(value) {
    /*var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
            rs = rs +str.substr(i, 1).replace(pattern, '');
        }*/
    //密码为6~20位的字母+数字
    var reg = /^(?!(?:\d*$))[A-Za-z0-9]{6,20}$/;
    if(!reg.test(value)){
        return false;
    }else{
        return true;
    }
}

/*邮箱 */

export function validateEmail(value) {
    let reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/;
    if(!reg.test(value)){
        return false;
    }else{
        return true;
    }
}
/**
 * 验证码
 */
export function validatevCode(value) {
    let reg = /^[0-9]{6}$/;
    if(!reg.test(value)){
        return false;
    }else{
        return true;
    }
}