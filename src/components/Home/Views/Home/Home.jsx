import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import Carousel from '../../Components/Carousel/Carousel'
import MainHome from '../../Components/MainHone/MainHome'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateproduct: [],
            topview: []
        }
    }
    render() {
        return (
            <div >
                <Carousel />
                <MainHome/>
            </div>
        )
    }
}
