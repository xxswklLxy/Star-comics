import axios from 'axios';

export function request(config) {
    // 1.创建axios 的实例
    const instance = axios.create({
        method: "GET",
        baseURL: 'http://47.114.147.221',
        timeout: 5000
    })

    // 2. axios 的拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {

        return config
    }, err => {
        console.log(err);

    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })


    // 3. 发送真正的网络请求
    return instance(config)
}