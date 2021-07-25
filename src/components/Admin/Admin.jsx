import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInfoApi } from '../../custom/repositories/api.repository';
import Login from './Login/Login';
import ChangeTitle from '../Share/ChangeTitle';
import TingPage from '../Share/TingPage';
import Catelogy from './Catelogy';
import Header from './Header';
import Info from './Info';
import Product from './Product';
import Promotion from './Promotion';
import Service from './Service';
import Slide from './Slide';

class Admin extends Component {
  constructor(props) {
    super(props);
    let auth = false;
    if (sessionStorage.getItem('token')) {
      auth = true
    }
    this.state = {
      info: {},
      authenticated: auth
    }
  }
  async componentDidMount() {
    await this.getPaging();
  }
  getPaging = async () => {
    let response = await getInfoApi().getPaging();
    if (response.status) {
      if (!response.role) {
        this.setState({ info: response.data, authenticated: false });
        return toast.error(response.mess)
      }
      else {
        this.setState({ info: response.data, authenticated: true })
        // return toast.success("Thành công", { autoClose: 1000 });
      }
    }
    else {
      return toast.error("Thất bại")
    }
  }
  setAuthenticated = (auth) => {
    this.setState({ authenticated: auth });
  }
  render() {
    return (
      <div className='bd'>
        {
          // this.state.authenticated ?
          <Router>
            <ChangeTitle />
            <TingPage />
            {this.state.authenticated &&
              <div style={{ marginBottom: "55px" }}>
                <Header info={this.state.info} getAuthenticated={(auth) => { this.setAuthenticated(auth) }} />
              </div>
            }
            <Switch>
              <Route exact path="/admin">
                <Redirect to={'/admin/login'} />
              </Route>
              <Route exact path="/admin/login">
                <Login getAuthenticated={(auth) => { this.setAuthenticated(auth) }} isLogin={this.state.authenticated} />
              </Route>
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/info" component={Info} />
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/catelogy" component={Catelogy} />
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/service" component={Service} />
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/product" component={Product} />
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/promotion" component={Promotion} />
              <PrivateRoute authenticated={this.state.authenticated} path="/admin/slide" component={Slide} />
            </Switch>
          </Router>
          // : <Login getAuthenticated={(auth) => { this.setAuthenticated(auth) }} />
        }
      </div>
    )
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route {...rest} render={
      (props) => (authenticated ? <Component /> :
        //  <Login getAuthenticated={(auth) => { this.setAuthenticated(auth) }} />
        <Redirect to={{ pathname: "/admin", state: { from: props.location } }} />)
    } />
  )
}
export default withRouter(Admin);