import React from "react";
// import {
//     LOGIN,
//     LOGIN_PAGE_UNLOADED,
//     UPDATE_FIELD_AUTH,
// } from "../../../constants/actionTypes";
import "./login.css";
import { ToastContainer,toast } from "react-toastify";
import {
    companiesAllApi,
    loginApi,
} from "../../custom/repositories/api.repository";
// const mapStateToProps = (state) => ({ ...state.auth, ...state.common });

// const mapDispatchToProps = (dispatch) => ({
//   onChangeEmail: (value) =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
//   onChangePassword: (value) =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
//   onSubmit: (email, password) =>
//     dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
//   onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
// });
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

    //     this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    //     this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    //     this.submitForm = (email, password) => ev => {
    //         ev.preventDefault();
    //         this.props.onSubmit(email, password);
    //     };
    // }
    // infition(){
    //     console.log(this.props)
    //     if(this.props.currentUser && this.props.currentUser.success){
    //         alert("Đăng nhập thành công");
    //     }
    //     else{
    //         alert(this.props.currentUser.message);
    //     }
    // }
    // componentWillUnmount() {
    //     this.props.onUnload();
    // }
    async componentDidMount() {
        await this.getAllCompany();
    }
    handelChangCode = (e) => {
        let { value } = e.target;
        this.setState({ code: value });
    };
    async handelSignIn() {
        if(this.state.code.trim()!==''){
            let obj = { company_code: this.state.code };
            console.log(this.state.company);
            let response = await loginApi().login(obj, this.state.companyId);
            console.log(response);
            if (response.status) {            
                let dt = response.company;
                sessionStorage.setItem("company_code", dt.company_code);
                sessionStorage.setItem("mode", dt.mode);
                sessionStorage.setItem("companyID", dt.id);
                this.props.history.push("/questions");
                return toast.success(response.msg,{autoClose:'1000'})
            } else {
               return toast.warn(response.msg,{autoClose:'5000'})
            }
        }
       else{
           this.setState({err:true});
        return toast.warn("Vui lòng nhập đầy đủ thông tin",{autoClose:'5000'})
       }
    };
    getAllCompany = async (search) => {
        let response = await companiesAllApi().getAll({ search });
        if (response) {
            this.setState({ company: response });
        } else {
        }
    };
    onChangeValueOptionComany = async (value) => {
        console.log(value.target.name);
        if (value.target.value !== "") {
            let com = this.state.company.find(
                (x) => x.id === parseInt(value.target.value)
            );
            this.setState({
                company_code: com.company_code,
                companyId: com.id,
                companyName:value.target.name
            });
        } else {
            this.setState({
                company_code: "",
                companyId: null,
                companyName:''
            });
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
