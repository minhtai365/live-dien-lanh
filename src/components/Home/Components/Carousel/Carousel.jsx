import React, { Component } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faMedal, faComments } from '@fortawesome/free-solid-svg-icons';
import { getSlideActiveApi } from '../../../../custom/repositories/api.repository';
import { toast } from 'react-toastify';
class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: []
        }
    }

    componentDidMount() {
        this.getSlide();
    }

    getSlide = async (search) => {
        let response = await getSlideActiveApi().getPaging({ search });
        if (response) {
            this.setState({ slides: response });
        }
        else {
            return toast.error("Thất bại")
        }
    }
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
            <div className='p-0'>
                <div className="text-center  mb-5 d-sm-block d-none">
                    <Slider {...settings} >
                        {this.state.slides && this.state.slides.map((slide, i) => {
                            return <div key={i}>
                                <img src={slide.img} />
                            </div>
                        })}
                    </Slider>
                </div>
                <div className="bg-dark text-light">

                    <div className="py-5 container">
                        <div className="row">
                            {/* <div className="col-md-3 col-12 justify-content-center d-flex">
                            <div className="d-flex justify-content-center">
                                <FontAwesomeIcon icon={faTruck} size='2x' color='red' />
                            </div>
                            <div className="text-center">
                                <h5>GIAO HÀNG MIỄN PHÍ</h5>
                                <span >Tất cả các đơn hàng {'>'} 1 triệu</span>
                            </div>
                        </div> */}
                            <div className="col-md-4 col-12 justify-content-center align-items-center d-flex">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faTruck} size='2x' color='red' />
                                    <div className="mt-2">
                                        <h6>GIAO HÀNG MIỄN PHÍ</h6>
                                        <span >Tất cả các đơn hàng {'>'} 1 triệu</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 my-3 justify-content-center align-items-center d-flex">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faMedal} size='2x' color='red' />
                                    <div className="mt-2">
                                        <h6>CAM KẾT HÀNG CHÍNH HÃNG</h6>
                                        <span >Hàng chính hãng 100%</span>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4 col-12 justify-content-center align-items-center d-flex">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faComments} size='2x' color='red' />
                                    <div className="mt-2">
                                        <h6>HỖ TRỢ NHANH CHÓNG</h6>
                                        <span >Tư vấn miễn phí</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Carousel