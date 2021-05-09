import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import {getInfoApi,setInfoApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';
import '../../css/table.css';
import '../../css/header.css';
export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: '',
            isSubmit: false,
            info: []
        }
    }
    //call API
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getInfoApi().getPaging({ search });
        console.log(response);
        if (response) {
            this.setState({ info: response[0]})
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }

    }
    handleChange = (e) => {
        let { value, name } = e.target;
        
        console.log(value);
        console.log(value);
        let info = { ...this.state.info, [name]: value };
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let questionErr = { ...this.state.questionErr, [name]: errorMessage }
        this.setState({
            info,
            questionErr,
            isSubmit: false
        })
    }

    saveInfo = async () => {
        let { question, questionsErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        for (let key in questionsErr) {
            if (questionsErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in question) {
            if (question[key] === '' || question[key] === 'Chọn loại...') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (true) {
            console.log(this.state.info);
            let response = await setInfoApi().set(this.state.info);
            if (response) {
                this.getPaging();
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false,
                })
                toast(response.msg, { autoClose: 1000 });
            } else {
                toast(response.msg, { autoClose: 5000 });
            }
        } else {
            //
            Swal.fire({
                icon: 'error',
                html: errorContent,
                confirmButtonText: 'Trở về'
            })
            return;
        }
    }
    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Thông tin
                        </h5>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.saveInfo} type='submit' className="btn btn-primary">Lưu</button>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Tên: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" className="form-control" defaultValue={this.state.info.name} />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Phone: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='phone' type="text" className="form-control" defaultValue={this.state.info.phone} />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Email: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='email' type="text" className="form-control" defaultValue={this.state.info.email} />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-4 ">
                        <label>Facebook: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='facebook' type="text" className="form-control" defaultValue={this.state.info.facebook} />
                    </div>
                    <div className="form-group col-4 ">
                        <label>Zalo: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='zalo' type="text" className="form-control" defaultValue={this.state.info.zalo} />
                    </div>
                    <div className="form-group col-4 ">
                        <label>Tiktok: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='tiktok' type="text" className="form-control" defaultValue={this.state.info.tiktok} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-4 ">
                        <label>Địa chỉ: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='address' type="text" className="form-control" defaultValue={this.state.info.address} />
                    </div>
                    <div className="form-group col-4 ">
                        <label>Logo: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='logo' type="text" className="form-control" defaultValue={this.state.info.logo} />
                    </div>
                    <div className="form-group col-4 ">
                        <label>Map: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='map' type="text" className="form-control" defaultValue={this.state.info.map} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-lg-4 col-6 ">
                        <label>chính sách thanh toán: </label>
                        <textarea onChange={this.handleChange} onBlur={this.handleChange} name='paypolicy' type="text" rows="4" className="form-control" defaultValue={this.state.info.pay} />
                    </div>
                    <div className="form-group col-lg-4 col-6 ">
                        <label>Chính sách vận chuyển: </label>
                        <textarea onChange={this.handleChange} onBlur={this.handleChange} name='shippolicy' type="text" rows="4" className="form-control" defaultValue={this.state.info.ship} />
                    </div>
                    <div className="form-group col-lg-4 col-6 ">
                        <label>Chính sách bảo hành: </label>
                        <textarea onChange={this.handleChange} onBlur={this.handleChange} name='warrantypolicy' type="text" rows="4" className="form-control" defaultValue={this.state.info.warranty} />
                    </div>
                    {/* <div className="row"> */}
                    <div className="form-group col-lg-12 col-6 ">
                        <label>Giới thiệu: </label>
                        <textarea onChange={this.handleChange} onBlur={this.handleChange} name='introduce' type="text" rows="4" className="form-control" defaultValue={this.state.info.introduce} />
                    {/* </div> */}
                </div>
                </div>
                
                <ToastContainer />
            </div>
        )
    }
}