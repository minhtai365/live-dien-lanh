import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { toast } from 'react-toastify';
import { getInfoApi, getServiceApi } from '../../custom/repositories/api.repository';
import Introduce from './Views/Introduce/Introduce';
import Home from './Views/Home/Home';
import ViewPost from '../Share/ViewPost';
import { connect } from 'react-redux';
import Contact from './Components/Contact/Contact';
import ViewProduct from './Components/ViewProduct/ViewProduct';
import ViewDetail from './Components/ViewDetail/ViewDetail';
import ToTopComponent from '../Share/ToTopComponent';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
    }
    async componentDidMount() {
        await this.getInfo();
        await this.getService();
    }
    getInfo = async (search) => {
        let response = await getInfoApi().getPaging({ search });
        if (response) {
            this.props.getInfo(response[0])
            this.setState({ info: response[0] })
        }
        else {
            return toast.error("Thất bại")
        }
    }
    getService = async (search) => {
        let response = await getServiceApi().getAll();
        if (response) {
            this.props.getService(response)
        }
        else {
            return toast.error("Thất bại")
        }
    }

    showToTop = () => {
        if (window.scrollY > 500) {
            this.setState({ showToTo: true });
        }
        else {
            this.setState({ showToTo: false });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.showToTop);
    }
    render() {
        window.addEventListener('scroll', this.showToTop);
        return (
            <Router>
                <ToTopComponent />
                <Header info={this.state.info} />
                <Switch>
                    <Route exact path="/" ><Redirect to='/home' /></Route>
                    <Route path="/home" component={Home} />
                    <Route path="/introduce" >
                        <Introduce info={this.state.info} />
                    </Route>
                    <Route path="/service/:slug" >
                        <ViewPost />
                    </Route>
                    <Route path="/catelogy/:slug">
                        <ViewProduct />
                    </Route>
                    <Route path="/product/:slug" >
                        <ViewDetail />
                    </Route>
                    <Route path="/contact" >
                        <Contact info={this.state.info} />
                    </Route>

                </Switch>
                {this.state.showToTo && <div className="box-to-top">
                    <button onClick={() => { window.scrollTo(0, 0) }} className="btn-to-top">
                    </button>
                    <i style={{ fontSize: '20px' }} className="fa fa-arrow-up"></i>

                </div>}
                <Footer info={this.state.info} />
            </Router>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getService: (service) => {
            dispatch({ type: 'GET_DATA_SERVICE', service })
        },
        getInfo: (info) => {
            dispatch({ type: 'GET_DATA_INFO', info })
        },

    }
}
export default connect(null, mapDispatchToProps)(Index)