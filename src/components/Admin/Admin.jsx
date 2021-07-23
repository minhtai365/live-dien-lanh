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
    this.state = {
      info: [],
      authenticated: false

    }
  }
  async componentDidMount() {
    await this.getPaging();
  }

  getPaging = async (search) => {
    let response = await getInfoApi().getPaging({ search });
    if (response) {
      this.setState({ info: response, authenticated: true })
      this.props.history.push('/admin/info')
    }
    else {
      return toast.error("Thành công")
    }
  }

  setAuthenticated = (auth) => {
    this.setState({ authenticated: auth });
  }

  render() {
    return (
      <div className='bd'>
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
              <Login getAuthenticated={(auth) => { this.setAuthenticated(auth) }} />
            </Route>
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/info" component={Info} />
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/catelogy" component={Catelogy} />
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/service" component={Service} />
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/product" component={Product} />
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/promotion" component={Promotion} />
            <PrivateRoute authenticated={sessionStorage.getItem('token')} path="/admin/slide" component={Slide} />
          </Switch>
        </Router>
      </div>
    )
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route {...rest} render={
      (props) => (authenticated ? <Component /> : <Redirect to={{ pathname: "/admin", state: { from: props.location } }} />)
    } />
  )
}
export default withRouter(Admin);