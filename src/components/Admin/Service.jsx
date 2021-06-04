import React, { Component } from 'react';

import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import { getServiceApi, setServiceApi, deleteApi } from '../../custom/repositories/api.repository';
import ReactHtmlParser from 'react-html-parser';
import Swal from 'sweetalert2';
import '../../css/table.css';
import '../../css/header.css';
import Post from './Post';
class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isShow: false,
            isSubmit: false,
            service: [],
            sevi: {}
        }
    }
    //call API
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getServiceApi().getAll();
        if (response.length > 0) {
            this.setState({ service: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }
    toggleModal = (sevi = null, action = null) => {
        let isOpen = true;
        if (sevi) {
            this.setState({ name: sevi.name, sevi });
            if (action === 'show') {
                this.setState({ isShow: true });
            }
            else {
                this.setState({ isOpen });
            }
        }
        else {
            this.setState({ name: "", sevi, isOpen: true });
        }

    };
    toggleModalClose = () => {
        let isOpen = false;
        let isShow = false;
        this.setState({
            isOpen,
            isShow,
            sevi: null
        });
    };
    handleChange = (e) => {
        let { value, name } = e.target;
        this.setState({
            [name]: value,
            isSubmit: false
        })
    }

    setSevice = async (sevi) => {
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        let obj = {};
        if (this.state.sevi) {
            obj = this.state.sevi;
        }
        obj.name = this.state.name;
        obj.post = sevi;
        let response = await setServiceApi().set(obj);
        if (response) {
            this.getPaging();
            let isOpen = false;
            this.setState({
                isOpen,
                isSubmit: false
            })
            toast(response.msg, { autoClose: 1000 });
        } else {
            toast(response.msg, { autoClose: 5000 });
        }
    }
    delete = async (sevi) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            let response = await deleteApi().delete(sevi);
            if (response) {
                this.getPaging();
                toast(response.msg, { autoClose: 1000 });
            } else {
                toast(response.msg, { autoClose: 5000 });
            }
        } else {
        }
    }

    renderModal = () => {
        console.log(this.state.sevi);

        return (<ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {this.state.sevi ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div style={{ overflowY: 'auto', height: '80vh', paddingInline: '20px', overflowX: 'hidden' }}>
                <div className="form-group px-4">
                    <div className="row">
                        <div className="col-7">
                            <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                            <label className="me-2">Tên: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.name} className="form-control w-75 d-inline" aria-describedby="helpId" />
                        </div>
                        <div className="col-5 ">
                            <label className="me-2">Mã bài viết: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='codepost' type="text" defaultValue={this.state.codepost} className="form-control w-50 d-inline" aria-describedby="helpId" />
                        </div>
                    </div>
                </div>
                <div >
                    <Post data={this.state.sevi !== null ? this.state.sevi.post : ''} submit={(sevi) => this.setSevice(sevi)} />
                </div>
            </div>
        </ModalForm>
        )
    }

    renderModalShow = () => {
        let data = {};
        if (this.state.sevi) {
            data.name = this.state.sevi.name;
            data.post = this.state.sevi.post;
        }
        return (<ModalForm show={this.state.isShow} size='lg' className="px-3" onClose={this.toggleModalClose}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {data.name}
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div style={{ overflowY: 'auto', height: '80vh', paddingInline: '20px', overflowX: 'hidden' }} >
                <div>
                    {ReactHtmlParser(data.post)}
                </div>
            </div>


        </ModalForm>
        )
    }

    render() {
        return (
            <div>
                {this.renderModal()}
                {this.renderModalShow()}
                <div className="card border-0 mb-0 body">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0 text-center ">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className='col-5'>Tên</th>
                                    <th className='col-4'>Ngày tạo</th>
                                    <th className='col-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.service.map((sevi, index) => {
                                    return (
                                        <tr className=' ml-2' style={{ width: '99%' }} key={index}>
                                            <td className='col-5 '> {sevi.name} </td>
                                            <td className="col-4 ">{sevi.createdlc}</td >
                                            <td className='text-right col-3 '>
                                                <button onClick={() => this.toggleModal(sevi, 'show')} className="button p-0 mr-1 btn-info">
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => this.toggleModal(sevi, 'edit')} className="button p-0 mr-1 btn-success">
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.delete(sevi) }} className="button p-0 btn-danger" >
                                                    {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Service;