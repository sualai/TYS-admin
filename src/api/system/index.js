import request  from 'utils/request'
// 查询路由
export function GetRoleInfo(query) {
    return request({
      url:'/role',
      method: 'get',
      params: query
    })
  }