import React, { Component } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faGlobe, faHeadset, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer container-fluid ">
                <div className="row">
                    <div className="contact col-4">
                        <h4>Thông tin liên Hệ</h4>
                        <hr />
                        <FontAwesomeIcon icon={faHome} />
                        <span> Địa chỉ</span>
                        <hr />
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span> Email</span>
                        <hr />
                        <FontAwesomeIcon icon={faPhone} />
                        <span> hotline</span>
                        <hr />
                        <FontAwesomeIcon icon={faGlobe} />
                        <span> website</span>
                        <hr />
                    </div>
                    <div className="contact col-2">
                        <h4>Chính sách</h4>
                        <hr />
                        <a href="#">Chính sách bảo mật</a>
                        <hr />
                        <a href="#">Chính sách thanh toán</a>
                        <hr />
                        <a href="#">Chính sách vận chuyển</a>
                        <hr />
                        <a href="#">Bảo hành đổi trả</a>
                        <hr />
                    </div>
                    <div className="contact col-3">
                        <h4>Phương thức thanh toán</h4>
                        <hr />
                        <span><i className="fa fa-home fa-xs" />Tất cả các giao dịch thanh toán đều được bảo mật 100%.</span>
                    </div>
                    <div className="contact col-3">
                        <h4>liên Hệ</h4>
                        <hr />
                        <FontAwesomeIcon icon={faHeadset} size="4x" color="orange" /><br /><br />
                        <span> hotline 24/7</span><br />
                        <h4>0942.939.691</h4>
                        <div className="social-icons">
                            <button type="button" className="btn btn-primary rounded-circle">
                                <FontAwesomeIcon icon={faFacebookF} color="#fff" />
                            </button>
                            <button type="button" className="btn btn--in rounded-circle">
                                <FontAwesomeIcon icon={faInstagram} color="#fff" />
                            </button>
                            <button type="button" className="btn btn--tw rounded-circle">
                                <FontAwesomeIcon icon={faTwitter} color="#fff" />
                            </button>
                            <button type="button" className="btn btn-primary rounded-circle">
                                <FontAwesomeIcon icon={faLinkedinIn} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
