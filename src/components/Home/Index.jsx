import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import { getInfoApi, getServiceApi, getSlideApi } from '../../custom/repositories/api.repository';
import Introduce from './Views/Introduce/Introduce';
import Home from './Views/Home/Home';
import ViewPost from '../Share/ViewPost';
import { connect } from 'react-redux';
import Contact from './Components/Contact/Contact';
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
        await this.getSlide();

    }
    getInfo = async (search) => {
        let response = await getInfoApi().getPaging({ search });
        if (response) {
            this.setState({ info: response[0] })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }
    getService = async (search) => {
        let response = await getServiceApi().getAll();
        if (response) {
            this.props.getService(response)
        }
    }
    getSlide = async (search) => {
        let response = await getSlideApi().getPaging({ search });
        if (response) {
            this.props.getSlide(response)
        }
    }

    render() {
        return (
            <Router>
                <Header info={this.state.info} />
                <Switch>
                    <div >
                        <Route exact path="/" ><Redirect to='/home' /></Route>
                        <Route path="/home" component={Home} />
                        <Route path="/introduce" >
                            <Introduce info={this.state.info} />
                        </Route>
                        <Route path="/service/:slug" >
                            <ViewPost />
                        </Route>
                        <Route path="/contact" >
                            <Contact info={this.state.info} />
                        </Route>
                    </div>
                </Switch>
                <Footer info={this.state.info} />
                <ToastContainer />

            </Router>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getService: (service) => {
            dispatch({ type: 'GET_DATA_SERVICE', service })
        },
        getSlide: (slides) => {
            dispatch({ type: 'GET_DATA_SLIDE', slides })
        },
    }
}
export default connect(null, mapDispatchToProps)(Index)