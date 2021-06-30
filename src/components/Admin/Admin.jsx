import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import Header from '../Share/Header';
import Catelogy from './Catelogy';
import Service from './Service';
import Product from './Product';
import Promotion from './Promotion';
import Slide from './Slide';
import Login from '../Login/Login';
import Info from './Info';
import { getInfoApi } from '../../custom/repositories/api.repository';
import { toast } from 'react-toastify';
import ChangeTitle from '../Share/ChangeTitle';
// import '../css/table.css';

 class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],

    }
  }
  async componentDidMount() {
    await this.getPaging();
  }

  getPaging = async (search) => {
    let response = await getInfoApi().getPaging({ search });
    if (response) {
      this.setState({ info: response[0] })
    }
    else {
      return toast.error("Thành công")
    }
  }


  render() {
    return (
      <div className='bd'>
        <Router>
          <ChangeTitle/>
          <Header info={this.state.info} />
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

export default withRouter(Admin);