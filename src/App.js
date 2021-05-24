import React, { Component } from 'react'
import {mainRouters} from './route'
import {Switch,Route,Redirect} from "react-router-dom"
import  Frame from "./components/Farme"
import {routersData} from "assets/data"
import asyncComponent from "components/AsyncComponent"

export default class App extends Component {
  rourte = ((menuData) =>{
    let menu = []
    const create = (menuData)=>{
      for(let i=0;i<menuData.length;i++){
        if(menuData[i].children){  //如果有子级菜单
          create(menuData[i].children);
        }else{   //如果没有子级菜单
          menu.push(
            <Route key={menuData[i].path} exact={menuData[i].exact} path={menuData[i].path} 
            component={asyncComponent(()=>import('./' +menuData[i].component))}
             />
          )
        }
      }
    };
    create(menuData);
    return menu;
  })(routersData)
  
  render() {
    console.log('组件路由',this.rourte)
    return (
      <Frame>
        <Switch>
          {mainRouters.map(item=>(
            <Route key={item.path} exact={item.exact} path={item.path} render={routeProps=>(
              <item.component {...routeProps} />
            )} />
          ))}
          {this.rourte}
          <Redirect to="/admin/home" />
        </Switch>
      </Frame>
    )
  }
}
