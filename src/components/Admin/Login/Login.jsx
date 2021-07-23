import React from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
// import { API_URL } from "../../../config/_index";
import { loginApi } from "../../../custom/repositories/api.repository";
import "./login.css";
// import {loginApi} from "../../../custom/repositories/api.repository";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        };
    }
    handelChang = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };
    keySubmit = (e) => {
        if (e.keyCode === 13) {
            this.handelSignIn();
        }
    }
    async handelSignIn() {
        // console.log(API_URL + 'users/');
        if (this.state.email.trim() === '' || this.state.pass.trim() === '') {
            return toast.error("Vui lòng nhập đầy đủ thông tin !!!", { autoClose: '500' })
        }
        let respone = await loginApi().login({ email: this.state.email, password: this.state.pass })
        if (respone && respone.status) {
            sessionStorage.setItem('token', respone.token);
            this.props.getAuthenticated(true);
            this.props.history.push('/admin/info');
        }
        else {
            this.props.getAuthenticated(false);
            return toast.error("Thông tin đăng nhập không đúng !!!", { autoClose: '500' })
        }
    };

    render() {
        const styleCenter = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        const stylemargin = {
            marginBottom: "30px",
            marginTop: "30px",
        };
        return (
            <div className="outer">
                <div className="inner">
                    <div style={(stylemargin, styleCenter)}>
                        <img
                            src="./images/tienthangsaigon.png"
                            alt=""
                            style={{ width: "100px" }}
                        />
                        <img
                            src="./images/dvp_logo.png"
                            alt=""
                            style={{ width: "100px" }}
                        />
                    </div>
                    <h3>Đăng nhập</h3>
                    <fieldset>
                        <fieldset className="form-group">
                            <div className="form-group">
                                <input type="email" onChange={(e) => this.handelChang(e)} onKeyDown={(e) => this.keySubmit(e)}
                                    className="form-control" name='email' placeholder="Email" />
                            </div>
                        </fieldset>
                        <fieldset className="form-group">
                            <div className="form-group">
                                <input type="password" onChange={(e) => this.handelChang(e)} onKeyDown={(e) => this.keySubmit(e)}
                                    className="form-control" name='pass' placeholder="Password" />
                            </div>
                        </fieldset>
                        <div className="text-center">

                            <button
                                className="btn btn-lg btn-primary text-center"
                                onClick={() => this.handelSignIn()}
                            >
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);
