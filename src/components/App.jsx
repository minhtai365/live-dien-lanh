import React from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './Share/Header';
import Catelogy from './Admin/Catelogy';
import Service from './Admin/Service';
import Product from './Admin/Product';
import Promotion from './Admin/Promotion';
import Slide from './Admin/Slide';
import Login from './Login/Login';
import Info from './Admin/Info';
// import '../css/table.css';
class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div ><Header appName={this.props.appName} currentUser={this.props.currentUser} />
            <Switch>
              <Route exact path="/login">
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
    );
  }
}
export default App;