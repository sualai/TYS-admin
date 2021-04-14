import React, { Component } from 'react'
import {mainRouters} from './route'
import {Switch,Route,Redirect} from "react-router-dom"
import  Frame from "./components/Farme"
export default class App extends Component {
  render() {
    return (
      <Frame>
        <Switch>
          {mainRouters.map(item=>(
            <Route key={item.path} exact={item.exact} path={item.path} render={routeProps=>(
              <item.component {...routeProps} />
            )} />
          ))}
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
  }
}
