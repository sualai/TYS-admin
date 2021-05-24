import axios  from "axios"
require('../setupProxy');
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/api',
    // 超时
    timeout: 300000
  })
  // request拦截器
  service.interceptors.request.use(
    config => {
      // if (store.getters.token) {
      //   config.headers['Authorization'] = 'Bearer ' //+ getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // }
    console.log(config)
      return config
    },
    error => {
      console.log(error)
      Promise.reject(error)
    }
  )
  
  // 响应拦截器
  service.interceptors.response.use(res => {
      const code = res.data.code
      console.log(code,'相应code')
      console.log(res.headers,'响应头部')
      console.log(res.data,'响应头部data')
      return res.data
    },
    error => {
    //   
      return Promise.reject(error)
    }
  )

export default service
