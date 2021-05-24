
import axios from 'axios'
import request from "../../utils/axiosTool"
import serve from '../../utils/request'
require('../../setupProxy');

export function getToken(data) {
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:'/api/users/token',
            params:data
          }).then(res=>{
            resolve(res.data)
          }).catch(err=>{
            reject(err)
          })
    })
}
// 获取token
export function addUsers (data) {
  return request({
    method:'post',
    url:'/api/users',
    data
  })
}

export function getUsersAll () {
  return request({
    method:'get',
    url:'/api/users/all'
  })
}
// 分页查询用户
export function getUsers (data) {
  return request({
    method:'get',
    url:'/api/users',
    params:data
  })
}
// 删除用户
export function delUsers (data) {
  return request({
    method:'delete',
    url:'/api/users',
    params:data
  })
}
// 登录
export function logoin (data) {
  return serve({
    method:'post',
    url:'/users/logoin',
    data
  })
}


