import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import { getInfoApi, setInfoApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import '../../css/table.css';
import '../../css/header.css';
import { API_URL } from '../../config/_index';
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
    getGPS = async () => {
        let info = this.state.info;
        await navigator.geolocation.getCurrentPosition(function (position) {
            info.gps = {
                x: position.coords.latitude.toFixed(4),
                y: position.coords.longitude.toFixed(4)
            }


        })
        this.setState({ info });
    }
    //call API
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getInfoApi().getPaging({ search });
        if (response) {
            this.setState({ info: response[0] })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }

    }
    handleChange = (e) => {
        let { value, name } = e.target;
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
    handleChangeFile = async (e) => {
        let { files } = e.target;
        let file =files[0];
        this.setState({file})
        let reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onloadend = async () => {
            await this.setState({ previewSource: reader.result });
        }
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
            let { info,previewSource } = this.state;
            // let formData = new FormData();
            // formData.append('logo', file);
            // if (info) {
            //     formData.append('info', JSON.stringify(info));
            // }
            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // }
            if(previewSource){
                info.logo=previewSource;
            }
            let response = await setInfoApi().set(info);
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
        console.log(this.state.previewSource);
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
                <form encType="multipart/form-data">
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
                            <label className="d-block">Logo: </label>
                            <input onChange={this.handleChangeFile} style={{ width: '40%', marginRight: '20px' }} name='logo' type="file" defaultValue={this.state.info.logo} />
                            {this.state.previewSource ? <img width="80" height="35" src={this.state.previewSource} alt="Logo" /> : <img className="boder-upload" src={this.state.info.logo} alt="Logoooo" />}
                        </div>
                        <div className="form-group col-4 ">
                            <label className="d-block">Map: </label>
                            {/* <button onClick={() => this.getGPS()} className=" boder-none" style={{ borderRadius: '100%', width: '40px', height: '40px', marginRight: '10px', outline: 'none' }}> */}
                            <div onClick={() => this.getGPS()}
                                style={{ width: '30px', height: '30px', alignItems: 'center', borderRadius: '100%', display: 'inline-block', marginRight: '10px' }}
                                className=" bg-primary text-light text-center">
                                <FontAwesomeIcon style={{}} className="boder-none bg-primary text-light" icon={faMapMarker} />
                            </div>
                            {/* </button> */}
                            {this.state.info.gps && <div className="d-inline ml-5">X: {this.state.info.gps.x}, Y :{this.state.info.gps.y}</div>}
                            {/* <input onChange={this.handleChange} onBlur={this.handleChange} name='map' type="text" className="form-control" defaultValue={this.state.info.map} /> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-4 col-6 ">
                            <label>Chính sách thanh toán: </label>
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
                </form>
                <ToastContainer />
            </div>
        )
    }
}