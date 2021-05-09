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
            <div className='container-fluid'>
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
                        <div className="col-3 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faTruck} size='3x' color='red' />
                            </div>
                            <div >
                                <h4>GIAO HÀNG MIỄN PHÍ</h4>
                                <span>Tất cả các đơn hàng {'>'} 1 triệu</span>
                            </div>
                        </div>
                        <div className="col-3 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faCreditCard} size='3x' color='red' />
                            </div>
                            <div >
                                <h4>BẢO MẬT THANH TOÁN</h4>
                                <span>Thanh toán an toàn 100%</span>
                            </div>
                        </div>
                        <div className="col-3 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faMedal} size='3x' color='red' />
                            </div>
                            <div >
                                <h4>CAM KẾT HÀNG CHÍNH HÃNG</h4>
                                <span>Hàng chính hãng 100%</span>
                            </div>
                        </div>
                        <div className="col-3 d-flex">
                            <div className="d-flex justify-content-start pr-2">
                                <FontAwesomeIcon icon={faComments} size='3x' color='red' />
                            </div>
                            <div >
                                <h4>HỖ TRỢ NHANH CHÓNG</h4>
                                <span>Tư vấn miễn phí</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
