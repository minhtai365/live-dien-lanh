import React, { Component } from 'react'
import { toast } from 'react-toastify';
import Carousel from '../../Components/Carousel/Carousel'
import MainHome from '../../Components/MainHone/MainHome'
export default class Home extends Component {
    componentDidMount() {
        return toast.success("Thành công", { autoClose: 1000 });
    }
    render() {
        return (
            <div >
                <Carousel />
                <MainHome />
            </div>
        )
    }
}
