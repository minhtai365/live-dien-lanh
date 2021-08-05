import React, { Component } from 'react';
import { toast } from "react-toastify";
import '../../css/header.css';
import '../../css/table.css';
import { deleteApi, getServiceApi, setServiceApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import TableHeader from './TableHeader';
import ViewPost from '../Share/ViewPost';
import Post from './Post';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isShowEditForm: false,
            isShow: false,
            isSubmit: false,
            service: [],
            sevi: null,
            post: ''
        }
    }
    //call API
    async componentDidMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getServiceApi().getAll();
        if (response.length > 0) {
            this.setState({ service: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thất bại")
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

    setSevice = async () => {
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
        obj.post = this.state.post;
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
        return (<ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {this.state.sevi ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div style={{ overflowY: 'auto', height: '75vh', paddingInline: '20px', overflowX: 'hidden' }}>
                <div className="form-group px-4">
                    <div className="row">
                        <div className="col-12">
                            <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                            <label className="me-2">Tên: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.name} className="form-control w-75 d-inline" aria-describedby="helpId" />
                        </div>
                        {/* <div className="col-5 ">
                            <label className="me-2">Mã bài viết: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='codepost' type="text" defaultValue={this.state.codepost} className="form-control w-50 d-inline" aria-describedby="helpId" />
                        </div> */}
                    </div>
                </div>
                <div >
                    <Post data={this.state.sevi !== null ? this.state.sevi.post : ''} getDataEditor={(dt) => this.setState({ post: dt })} />
                </div>
            </div>
            <div className="modal-footer">
                <button onClick={() => this.setSevice()} type='submit' className="btn btn-primary">
                    {this.state.sevi ? 'Sửa' : 'Thêm'}
                </button>
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
                <ViewPost data={data.post} />
            </div>

            <div className="modal-footer">
            </div>
        </ModalForm>
        )
    }
    formatDate = (str) => {
        return str.split(',').slice(0, 1).join('');
    }

    statusFormEdit = () => {
        if (this.state.isShowEditForm) {
            document.querySelector('.edit-form').classList.add("edit-form-show");
            document.querySelector('.body-service').style.right = '100%';
        }
        else {
            if (document.querySelector('.edit-form-show')&&document.querySelector('.body-service')) {
                document.querySelector('.edit-form').classList.remove("edit-form-show");
                document.querySelector('.body-service').style.right = '0';
            }

        }
    }

    toggleEditForm = (sevi = null, action = null) => {
        let isShowEditForm = true;
        if (sevi) {
            this.setState({ name: sevi.name, sevi });
            if (action === 'show') {
                this.setState({ isShow: true });
            }
            else {
                this.setState({ isShowEditForm });
            }
        }
        else {
            this.setState({ name: "", sevi, isShowEditForm: true });
        }

    };
    toggleEditClose = () => {
        let isShowEditForm = false;
        let isShow = false;
        this.setState({
            isShowEditForm,
            isShow,
            sevi: null
        });
    };
    formEditService = () => {
        return (
            <div className="edit-form">
                <div className="modal-header">
                    <h5 className="modal-title">
                        {this.state.sevi ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
                    </h5>
                    <button type="button" className="close ms-auto" onClick={this.toggleEditClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div style={{ overflowY: 'auto', height: '75vh', paddingInline: '10px', overflowX: 'hidden' }}>
                    <div className="form-group px-4">
                        <div className="row">
                            <div className="col-12">
                                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                                <label className="me-2">Tên: </label>
                                <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.name} className="form-control w-75 d-inline" aria-describedby="helpId" />
                            </div>
                            {/* <div className="col-5 ">
                            <label className="me-2">Mã bài viết: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='codepost' type="text" defaultValue={this.state.codepost} className="form-control w-50 d-inline" aria-describedby="helpId" />
                        </div> */}
                        </div>
                    </div>
                    <div >
                        {this.state.isShowEditForm &&
                            <Post data={this.state.sevi !== null ? this.state.sevi.post : ''} getDataEditor={(dt) => this.setState({ post: dt })} />
                        }
                    </div>
                </div>
                <div className="modal-footer position-fixed" style={{right:'0'}}>
                    <button onClick={() => this.setSevice()} type='submit' className="btn btn-primary show-btn">
                        {this.state.sevi ? 'Sửa' : 'Thêm'}
                    </button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="con-page">
                {/* {this.renderModal()} */}
                {this.renderModalShow()}
                {this.statusFormEdit()}
                {this.formEditService()}
                <div className="card border-0 mb-0 body body-service">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleEditForm} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0 text-center table-striped">
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
                                        <tr className=' ml-2' key={index}>
                                            <td className='col-5' style={{ cursor: 'pointer' }} title="Xem chi tiết" onClick={() => this.toggleModal(sevi, 'show')}> {sevi.name} </td>
                                            <td className="col-4" style={{ cursor: 'pointer' }} title="Xem chi tiết" onClick={() => this.toggleModal(sevi, 'show')}>{this.formatDate(sevi.createdlc)}</td >
                                            <td className='text-right col-3'>
                                                {/* <button onClick={() => this.toggleModal(sevi, 'show')} className="button p-0 mr-1 btn-info">
                                                    <i className="fas fa-eye text-light"></i>
                                                </button> */}
                                                <button onClick={() => this.toggleEditForm(sevi, 'edit')} title="Sửa" className="button p-0 mr-1 btn-success">
                                                    <i className="fas fa-edit"></i>
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.delete(sevi) }} title="Xóa" className="button p-0 btn-danger" >
                                                    <i className="fas fa-trash-alt"></i>
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
            </div>
        )
    }
}

export default Service;