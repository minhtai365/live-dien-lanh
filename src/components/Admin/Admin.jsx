import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInfoApi } from '../../custom/repositories/api.repository';
import Login from '../Login/Login';
import ChangeTitle from '../Share/ChangeTitle';
import TingPage from '../Share/TingPage';
import Catelogy from './Catelogy';
import Header from './Header';
import Info from './Info';
import Product from './Product';
import Promotion from './Promotion';
import Service from './Service';
import Slide from './Slide';
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
          <TingPage/>
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