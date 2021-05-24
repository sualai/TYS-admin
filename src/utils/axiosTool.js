
import axios from 'axios'
require('../setupProxy');
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://localhost:3000/',
  // 超时
  timeout: 300000
})
service.interceptors.response.use(res => {
  const code = res.data.code
  console.log(code)
  console.log(res.headers)
  return res.data
},
error => {
//   
  return Promise.reject(error)
}
)
export default (params)=> {
    return new Promise((resolve,reject)=>{
        axios(params).then(res=>{
            resolve(res.data)
          }).catch(err=>{
            reject(err)
          })
    })
}