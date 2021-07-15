import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInfoApi, getServiceApi } from '../../../custom/repositories/api.repository';
import ChangeTitle from '../../Share/ChangeTitle';
import ResutlSearch from '../Components/ResutlSearch/ResutlSearch';
import TingPage from '../../Share/TingPage';
import ToTopComponent from '../../Share/ToTopComponent';
import ViewPost from '../../Share/ViewPost';
import Contact from '../Components/Contact/Contact';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Home from '../Components/Home/Home';
import Introduce from '../Components/Introduce/Introduce';
import ViewDetail from '../Components/ViewDetail/ViewDetail';
import ViewProduct from '../Components/ViewProduct/ViewProduct';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            showToTo: false,
            showSup: false,
        }
        this.url = "music/beep.mp3";
        this.audio = new Audio(this.url);
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
        if (window.scrollY > 600) {
            this.setState({ showToTo: true });
        }
        else {
            this.setState({ showToTo: false });
        }
    }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.showToTop);
    // }
    tingRing() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    // console.log("audio played auto");
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playback prevented");
                });
        }
    }
    render() {
        window.addEventListener('scroll', this.showToTop);
        return (
            <Router>
                <ToTopComponent />
                <ChangeTitle />
                <TingPage />
                <Header info={this.state.info} showScroll={this.state.showToTo} />
                <div className="mtop-nav">
                    <Switch>
                        <Route exact path="/" ><Redirect to='/trang-chu' /></Route>
                        <Route path="/trang-chu" component={Home} />
                        <Route path="/gioi-thieu" >
                            <Introduce info={this.state.info} />
                        </Route>
                        <Route path="/tim-kiem">
                            <ResutlSearch />
                        </Route>
                        <Route path="/dich-vu/:slug" >
                            <ViewPost />
                        </Route>
                        <Route path="/san-pham/:slug">
                            <ViewProduct />
                        </Route>
                        <Route path="/chi-tiet/:slug" >
                            <ViewDetail />
                        </Route>
                        <Route path="/lien-he" >
                            <Contact info={this.state.info} />
                        </Route>
                    </Switch>
                </div>
                <div className="support-online">
                    <div className="support-content" >
                        <a href="tel:0352268668" className="call-now">
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

                    <div className="btn-support" onClick={() => {
                        if (this.state.showSup) {
                            this.setState({ showSup: false })
                            document.querySelector('.support-content').style.display = 'none';
                            this.tingRing();
                        }
                        else {
                            this.setState({ showSup: true })
                            document.querySelector('.support-content').style.display = 'block';
                            this.tingRing();
                        }
                    }}>
                        <div className="animated infinite zoomIn kenit-alo-circle"></div>
                        <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </div>
                </div>
                <a target="_blank" className="icon-chatzalo" href="https://zalo.me/0352268668" rel="noreferrer">
                    <div className="animated infinite zoomIn kenit-alo-circle"></div>
                    <div className="animated infinite pulse kenit-alo-circle-fill"></div>
                    <i><img src="/images/zalo.png" className="w100" alt="Zalo" /></i>
                </a>
                {this.state.showToTo &&
                    <div className="box-to-top">
                        <button onClick={() => { window.scrollTo(0, 0); this.tingRing() }} className="btn-to-top">
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
export default connect('', mapDispatchToProps)(Index)