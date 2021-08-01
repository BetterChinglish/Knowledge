import axios from 'axios';


export function request(config) {

    const instance = axios.create({
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000
    })

    // 请求拦截
    instance.interceptors.request.use(config=>{
        // 如果有一个接口需要认证才可以访问,就在这统一设置

        // 直接放行
        return config;

    }, err=>{

    })


    // 响应拦截
    instance.interceptors.response.use(res=>{

        return res;

    }, err=>{
        // 如果有错误, 这里处理
        
    })


}