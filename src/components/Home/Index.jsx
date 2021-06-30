import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { toast } from 'react-toastify';
import { getInfoApi, getProductApi, getServiceApi } from '../../custom/repositories/api.repository';
import Introduce from './Views/Introduce/Introduce';
import Home from './Views/Home/Home';
import ViewPost from '../Share/ViewPost';
import { connect } from 'react-redux';
import Contact from './Components/Contact/Contact';
import ViewProduct from './Components/ViewProduct/ViewProduct';
import ViewDetail from './Components/ViewDetail/ViewDetail';
import ToTopComponent from '../Share/ToTopComponent';
import ChangeTitle from '../Share/ChangeTitle';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            showToTo: false,
            showSup: false,
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
        // console.log(window.scrollY);
        if (window.scrollY > 600) {
            this.setState({ showToTo: true });
            // document.getElementsByClassName('box-to-top').style.display="block";
        }
        else {

            // document.getElementsByClassName('box-to-top').style.display="none";
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
                <ChangeTitle/>
                <Header info={this.state.info} showScroll={this.state.showToTo} />
                <div className="mtop-nav">
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
                </div>
                <div className="support-online">
                    <div className="support-content" >
                        <a href="tel:0352268668" className="call-now" rel="nofollow">
                            <i className="fab fa-whatsapp"></i>
                            <div className="animated infinite zoomIn kenit-alo-circle"></div>
                            <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                            <span>Hotline: 0352268668</span>
                        </a>
                        {/* <a className="mes" href="https://goo.gl/maps/uvqzfF3pHvziayodA" target="_blank">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Chỉ đường</span>
                        </a> */}
                        <a className="sms" href="sms:0352268668">
                            <i className="fas fa-comments"></i>
                            <div className="animated infinite zoomIn kenit-alo-circle"></div>
                            <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                            <span>SMS: 0352268668</span>
                        </a>

                    </div>

                    <a className="btn-support" onClick={() => {
                        if (this.state.showSup) {
                            this.setState({ showSup: false })
                            document.querySelector('.support-content').style.display = 'none';
                        }
                        else {
                            this.setState({ showSup: true })
                            document.querySelector('.support-content').style.display = 'block';
                        }
                    }}>
                        <div className="animated infinite zoomIn kenit-alo-circle"></div>
                        <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </a>
                </div>
                <a target="_blank" className="icon-chatzalo" href="https://zalo.me/0352268668">
                    <div className="animated infinite zoomIn kenit-alo-circle"></div>
                    <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                    <i><img src="/images/zalo.png" className="w100" alt="Zalo" /></i>
                </a>
                {this.state.showToTo &&
                    <div className="box-to-top">
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