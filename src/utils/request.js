import axios from 'axios';
import { Message }from 'element-ui';
/**
 * 创建axios，
 */
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const service = axios.create({
    baseURL:BASEURL,
    timeout:1000,
});
//console.log(process.env.NODE_ENV);
//console.log(process.env.VUE_APP_ABC);


service.interceptors.request.use(function(config){
    return config;
},function(error){
    return Promise.reject(error);
});
//添加响应拦截器
service.interceptors.response.use(function(response){
    let data = response.data;
    if(data.resCode !== 0){
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
    }
    return response;
},function(error){
    return Promise.reject(error);
});
 
export default service;