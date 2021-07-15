import { faComments, faMedal, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getSlideActiveApi } from '../../../../custom/repositories/api.repository';
import MailBox from '../../../Share/MailBox';
import "./Carousel.css";
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
            // return toast.success("Thành công", { autoClose: 1000 });

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
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className=''>
                
                <MailBox/>
                <div className="text-center mb-4 container-480">
                    <Slider {...settings} >
                        {this.state.slides && this.state.slides.map((slide, i) => {
                            return <div className="box-slide" key={i}>
                                <img className="img-slide" src={slide.img} alt="Hình"/>
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