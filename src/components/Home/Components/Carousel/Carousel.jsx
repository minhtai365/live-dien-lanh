import React, { Component } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck,faCreditCard,faMedal,faComments } from '@fortawesome/free-solid-svg-icons';

export default class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='container-fluid p-0'>
                <div className='carousel '>
                    <Slider {...settings} >
                        <div>
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                        <div>
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                        <div>
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                        <div>
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                    </Slider>
                </div>
                <div className="py-4 section d-flex m-auto">
                    <div className="row m-auto">
                        <div className="col-lg-3 col-md-6 col-12 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faTruck} size='2x' color='red' />
                            </div>
                            <div >
                                <h5>GIAO HÀNG MIỄN PHÍ</h5>
                                <span>Tất cả các đơn hàng {'>'} 1 triệu</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faCreditCard} size='2x' color='red' />
                            </div>
                            <div >
                                <h5>BẢO MẬT THANH TOÁN</h5>
                                <span>Thanh toán an toàn 100%</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faMedal} size='2x' color='red' />
                            </div>
                            <div >
                                <h5>CAM KẾT HÀNG CHÍNH HÃNG</h5>
                                <span>Hàng chính hãng 100%</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 d-flex">
                            <div className="d-flex justify-content-start">
                                <FontAwesomeIcon icon={faComments} size='2x' color='red' />
                            </div>
                            <div className="pl-2" >
                                <h5>HỖ TRỢ NHANH CHÓNG</h5>
                                <span>Tư vấn miễn phí</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
