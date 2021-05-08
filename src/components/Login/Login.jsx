import React from "react";
import "./login.css";
import { ToastContainer,toast } from "react-toastify";
import {
    loginApi,
} from "../../custom/repositories/api.repository";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemPage: 10,
            reviews: [],
            questions: [],
            company: [],
            isOpen: false,
            show: "",
            addQues: 1,
            reviewId: "",
            isShowThank: false,
            isSubmitForm: false,
            title: "",
            company_code: "",
            code: "",
            companyId: null,
            err:false,
            companyName:''
        };
    }
    handelChangCode = (e) => {
        let { value } = e.target;
        this.setState({ code: value });
    };
    async handelSignIn() {
        return toast.warn("Vui lòng nhập đầy đủ thông tin",{autoClose:'5000'})
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
                    {/* <form
                        onSubmit={() => this.handelSignIn()}
                    > */}
                    <h3>Đăng nhập</h3>
                    <fieldset>
                        <fieldset className="form-group">
                            <select
                                style={{ marginTop: "10px" }}
                                className="custom-select"
                                name='companyName'
                                onChange={this.onChangeValueOptionComany}
                            >
                                <option value="">Vui lòng chọn công ty</option>
                                {this.state.company.map((res, key) => {
                                    return (
                                        <option value={res.id} key={key}>
                                            {res.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {this.state.err&&this.state.companyName.trim()===''&&<div style={{color:'red',fontSize:'13px'}}>Mã công ty không được để trống</div>}
                        </fieldset>

                        {/* {this.state.company_code!==""&& <div className='code m-auto'>{ this.state.company_code}</div>} */}

                        <fieldset className="form-group">
                            <input
                                onChange={this.handelChangCode}
                                type="text"
                                name="code"
                                className="form-control"
                                placeholder="Vui lòng nhập mã công ty"
                                style={{ marginTop: "10px" }}
                            />
                            {this.state.err&&this.state.code.trim()===''&&<div style={{color:'red',fontSize:'13px'}}>Mã công ty không được để trống</div>}
                        </fieldset>
                        <button
                            className="btn btn-lg btn-primary pull-xs-right"
                            onClick={() => this.handelSignIn()}
                        >
                            Sign in
              </button>
                    </fieldset>
                    {/* </form> */}
                </div>
                <ToastContainer />
            </div>
        );
    }
}
export default Login;
