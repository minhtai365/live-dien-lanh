import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
class Index extends Component {
    render() {
        return (
            <Router>
                <div >
                    <Header/>
                    <Carousel/>
                    <Switch>
                        {/* <Route exact path="/" component={}/> */}
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
export default Index;