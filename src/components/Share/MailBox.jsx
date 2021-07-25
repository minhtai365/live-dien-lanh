import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { userApi } from '../../custom/repositories/api.repository';
// init("user_nKeVBfeN3GHyTUJMC2JeR");
class MailBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    async handleSendMail() {
        let respone = userApi().sendMail({ name: this.state.name, email: this.state.email, phone: this.state.phone });
        console.log(respone);
    }
    handleSubmit(event) {
        const templateId = 'template_h6nx0dh';
        this.sendFeedback(templateId, { from_name: this.state.name, reply_to: this.state.email, phone_to: this.state.phone })
    }
    sendFeedback(templateId, variables) {
        emailjs.send(
            "service_yp5zkaq", templateId,
            variables, "user_nKeVBfeN3GHyTUJMC2JeR"
        ).then(res => {
            alert("Đăng ký thành công !");
            // console.log('Email successfully sent!')
        })
            .catch(err => alert(err)
                //  console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            )

        //rep cus
        // emailjs.send(
        //     "service_yp5zkaq", "template_t1wjple",
        //     variables, "user_nKeVBfeN3GHyTUJMC2JeR"
        // ).then(res => {
        //     console.log('Email successfully sent!')
        // })
        //     // Handle errors here however you like, or use a React error boundary
        //     .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    render() {
        return (
            <form className="test-mailing">
                <div className="parent-mail">
                    <div className="top-email"></div>
                    <div className="bottom-email"></div>
                    <div className="box-email container py-3 py-sm-4 px-3 row mx-auto">
                        <div className="text-center" >
                            <div style={{ fontSize: '70px' }}><i className="fas fa-envelope-open-text"></i></div>
                            <h4> Đăng ký nhận tin</h4>
                            <p> Mỗi tháng chúng tôi đều có những đợt giảm giá dịch vụ và sản phẩm nhằm chi
                                ân khách hàng. Để có thể cập nhật kịp thời những đợt giảm giá này, vui lòng nhập địa chỉ
                                email của bạn vào ô dưới đây.</p>
                        </div>
                        <div className="form-group text-center row">
                            <div className="my-2 col-md-4 col-12">
                                <input type="text" className="form-control" required onChange={(e) => this.handleChange(e)} name="name" placeholder="Tên" />
                            </div>
                            <div className=" my-2 col-md-4 col-12">
                                <input type="text" className="form-control" required onChange={(e) => this.handleChange(e)} name="phone" placeholder="Điện thoại" />
                            </div>
                            <div className=" my-2 col-md-4 col-12">
                                <input type="text" className="form-control" required onChange={(e) => this.handleChange(e)} name="email" placeholder="Email" />
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="btn btn-danger " onClick={(e) => this.handleSendMail(e)}>Đăng ký</div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default MailBox;