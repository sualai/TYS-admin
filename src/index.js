import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {baseRouter} from './route'
import {Switch,Route,Redirect} from "react-router-dom"
import {BrowserRouter} from "react-router-dom"
import zhCN from 'antd/lib/locale/zh_CN';
// import "./assets/icons"
import  {ConfigProvider } from 'antd'
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={routeProps=><App {...routeProps} />} />
      {baseRouter.map(item=>(
        <Route key={item.path} {...item} />  
      ))}
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);
