import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import { getCateApi, setCateApi, deleteApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';
import '../../css/table.css';
import '../../css/header.css';
export default class Catelogy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: '',
            isSubmit: false,
            cates: []
        }
    }
    //call API
    async componentDidMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getCateApi().getPaging();
        if (response.length > 0) {
            this.setState({ cates: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }
    toggleModal = (cate = null) => {
        let isOpen = true;
        if (cate) {
            this.setState({ name: cate.name, cate });
        }
        else {
            this.setState({ name: "", cate });
        }
        this.setState({
            isOpen,
        });
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.setState({
            isOpen,
            cate: null
        });
    };
    handleChange = (e) => {
        let { value, name } = e.target;
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let questionErr = { ...this.state.questionErr, [name]: errorMessage }
        this.setState({
            [name]: value,
            questionErr,
            isSubmit: false
        })
    }

    setCate = async () => {
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
        if (valid) {
            let obj = {};
            if (this.state.cate) {
                obj = this.state.cate;
            }
            obj.name = this.state.name;
            let response = await setCateApi().set(obj);
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
    delete = async (cate) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            let response = await deleteApi().delete(cate);
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
        return (<ModalForm show={this.state.isOpen} size='md' onClose={this.toggleModalClose}>
            <div className="modal-header">
                <h5 className="modal-title">
                    Thêm danh mục
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <div className="form-group px-5 pt-4 ">
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label>Tên: </label>
                <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.name} className="form-control" aria-describedby="helpId" />
            </div>
            <div className="modal-footer">
                <button onClick={this.setCate} type='submit' className="btn btn-primary">Thêm</button>
            </div>
        </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0 mb-0 body">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0 text-center table-striped">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className='col-4'>Tên</th>
                                    <th className='col-3'>Số sản phẩm</th>
                                    <th className='col-3'>Ngày tạo</th>
                                    <th className='col-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cates.map((cate, index) => {
                                    return (
                                        <tr className=' ml-2' key={index}>
                                            <td className='col-4 '> {cate.name} </td>
                                            <td className='col-3 '></td>
                                            <td className="col-3 ">{cate.createdlc}</td >
                                            <td className='text-right col-2 '>
                                                <button onClick={() => this.toggleModal(cate)} className="button p-0 mr-1 btn-success">
                                                    <i className="fas fa-edit"></i>

                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.delete(cate) }} className="button p-0 btn-danger" >
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