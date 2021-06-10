import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from '../Share/Header';
import Catelogy from './Catelogy';
import Service from './Service';
import Product from './Product';
import Promotion from './Promotion';
import Slide from './Slide';
import Login from '../Login/Login';
import Info from './Info';
// import '../css/table.css';

export default class Admin extends Component {
  render() {
    return (
      <div className='bd'>
        <Router>
            <Header appName={this.props.appName} currentUser={this.props.currentUser} />
            <Switch>
              <Route exact path="/admin">
                <Login />
              </Route>
              <Route path="/admin/info" component={Info} />
              <Route path="/admin/catelogy" component={Catelogy} />
              <Route path="/admin/service" component={Service} />
              <Route path="/admin/product" component={Product} />
              <Route path="/admin/promotion" component={Promotion} />
              <Route path="/admin/slide" component={Slide} />
            </Switch>
        </Router>
       </div>
    )
  }
}
