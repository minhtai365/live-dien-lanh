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
          <div >
            <Header appName={this.props.appName} currentUser={this.props.currentUser} />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/info" component={Info} />
              <Route path="/catelogy" component={Catelogy} />
              <Route path="/service" component={Service} />
              <Route path="/product" component={Product} />
              <Route path="/promotion" component={Promotion} />
              <Route path="/slide" component={Slide} />
            </Switch>
          </div>
        </Router>
       </div>
    )
  }
}
