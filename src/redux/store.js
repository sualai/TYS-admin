// 创建store
import {createStore} from 'redux'
// 引入reducers
import reducer from './readucers'
// 暴露store
export default createStore(reducer)