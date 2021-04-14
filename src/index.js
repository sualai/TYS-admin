import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {baseRouter} from './route'
import {Switch,Route,Redirect} from "react-router-dom"
import {BrowserRouter} from "react-router-dom"
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={routeProps=><App {...routeProps} />} />
      {baseRouter.map(item=>(
        <Route key={item.path} {...item} />  
      ))}
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

