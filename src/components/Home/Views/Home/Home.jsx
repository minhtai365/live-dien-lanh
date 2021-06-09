import React, { Component } from 'react'
import Carousel from '../../Components/Carousel/Carousel'
import MainHome from '../../Components/MainHone/MainHome'
export default class Home extends Component {
    render() {
        return (
            <div >
                <Carousel />
                <MainHome/>
            </div>
        )
    }
}
