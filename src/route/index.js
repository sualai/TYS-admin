import {withRouter} from 'react-router-dom'
import Home from 'pages/Home'
import Assign from '../pages/Assign'
import Login from '../pages/Login'
import ErrorPage from '../components/404'
import User from '../pages/System/User'
import RouterComponent from '../pages/System/RouterComponent'

export const mainRouters = [
    {
        path:'/admin/home',
        component:Home,
        isShow:true,
        title:'首页'
    },
    {
        path:'/admin/system/route',
        component:RouterComponent,
        isShow:false,
        title:'路由管理'
    },
    {
        path:'/admin/system/user',
        component:User,
        isShow:true,
        title:'用户管理'
    },
    {
        path:'/admin/assign',
        component:Assign,
        isShow:true,
        title:'侧边栏'
    }
]
export const baseRouter = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/404',
        component:withRouter(ErrorPage)
    }
]