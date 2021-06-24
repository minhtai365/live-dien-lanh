import React, { Component } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faGlobe, faHeadset, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { info } = this.props
        return (
            // <div className="footer container-fluid ">
            //     <div className="row">
            //         <div className="contact col-lg-3 col-md-6">
            //             <h4>Thông tin liên Hệ</h4>
            //             <hr />
            //             <FontAwesomeIcon icon={faHome} />
            //             <span> Địa chỉ : </span><span>{this.props.info.address}</span>
            //             <hr />
            //             <FontAwesomeIcon icon={faEnvelope} />
            //             <span> Email : </span><span>{this.props.info.email}</span>
            //             <hr />
            //             <FontAwesomeIcon icon={faPhone} />
            //             <span> hotline : </span><span>{this.props.info.phone}</span>
            //             <hr />
            //         </div>
            //         <div className="contact col-lg-3 col-md-6">
            //             <h4>Chính sách</h4>
            //             <hr />
            //             <a href="#">Chính sách bảo mật</a>
            //             <hr />
            //             <a href="#">Chính sách thanh toán</a>
            //             <hr />
            //             <a href="#">Chính sách vận chuyển</a>
            //             <hr />
            //             <a href="#">Bảo hành đổi trả</a>
            //             <hr />
            //         </div>
            //         <div className="contact col-lg-3 col-md-6">
            //             <h4>Phương thức thanh toán</h4>
            //             <hr />
            //             <span>Tất cả các giao dịch thanh toán đều được bảo mật 100%.</span>
            //             <hr className='d-md-none'/>
            //         </div>
            //         <div className="contact col-lg-3 col-md-6">
            //             <h4>liên Hệ</h4>
            //             <hr />
            //             <FontAwesomeIcon icon={faHeadset} size="4x" color="orange" /><br /><br />
            //             <span> hotline 24/7</span><br />
            //             <h4>0942.939.691</h4>
            //             <div className="social-icons">
            //                 <button type="button" className="btn btn--fb rounded-circle">
            //                     <FontAwesomeIcon icon={faFacebookF} color="#fff" />
            //                 </button>
            //                 <button type="button" className="btn btn--in rounded-circle ">
            //                     <FontAwesomeIcon icon={faInstagram} color="#fff" />
            //                 </button>
            //                 <button type="button" className="btn btn--tw rounded-circle">
            //                     <FontAwesomeIcon icon={faTwitter} color="#fff" />
            //                 </button>
            //                 <button type="button" className="btn btn-primary rounded-circle">
            //                     <FontAwesomeIcon icon={faLinkedinIn} color="#fff" />
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div>
                <div>
                    <div className="bg-dark text-light pt-4 pb-3 mt-5">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-7 col-12">
                                    <div className="row">
                                        <div className="col-7">
                                            <h5>{info.name}</h5>
                                            <p>Địa chỉ: {info.address}</p>
                                            <p>Số điện thoại: {info.phone}</p>
                                            <p>Email: {info.email}</p>
                                        </div>
                                        <div style={{}} className="col-5">
                                            <h5>CHÍNH SÁCH</h5>
                                            <p>Chính sách thanh toán</p>
                                            <p>Chính sách đổi trả</p>
                                            <p>Chính sách giao hàng</p>
                                        </div>

                                        {/* <GoogleMap/> */}
                                        {info.gps ? <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31345.848545978115!2d106.61735299999998!3d10.870021999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1623141743941!5m2!1svi!2s"
                                            style={{ width: '500px', height: '300px', border: '0' }} frameBorder="0" aria-hidden="false" tabIndex="0" /> : ''}
                                    </div>
                                </div>
                                <div className="col-md-5 col-12">
                                    <h3>Kết nối với chúng tôi</h3>
                                    <a></a>
                                    <div className="footer-content">
                                        <a target='_blank' href={info.facebook} className="btn btn-link px-4 px-md-3  text-primary" >
                                            <i className="fab fa-facebook-f" /></a>
                                        <button className="btn btn-link px-4 px-md-3 text-danger" >
                                            <i className="fab fa-youtube" /></button>
                                        <button className="btn btn-link px-4 px-md-3 text-info" >
                                            <i className="fab fa-twitter" /></button>
                                        <button className="btn btn-link px-4 px-md-3 text-light" >
                                            <i className="fab fa-instagram" /></button>
                                    </div>
                                    <div className="form">
                                        <h4> Đăng ký nhận tin</h4>
                                        <p> Mỗi tháng chúng tôi đều có những đợt giảm giá dịch vụ và sản phẩm nhằm chi
                                            ân khách hàng. Để có thể cập nhật kịp thời những đợt giảm giá này, vui lòng nhập địa chỉ
                                            email của bạn vào ô dưới đây.</p>
                                        <form>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input type="email" className="form-control"
                                                    aria-describedby="emailHelpId" placeholder="Your email" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary">
                        <div className="container text-light">
                            <div className="d-flex justify-content-between flex-md-row flex-column">
                                <div>Copyright 2020 © Minh Tài</div>
                                <div>Thiết kế website bởi Minh Tài</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
