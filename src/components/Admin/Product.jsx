import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import { companiesApi, companiesPagingApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';

import '../../css/table.css';
import '../../css/header.css';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPage: 10,
            companies: [],
            company: {
                name: "",
                locate: "",
                email: "",
                hotline: "",
            },
            companyErr: {
                name: "",
                locate: "",
                email: "",
                hotline: "",
            },
            companyEdit: {
                name: "",
                locate: "",
                email: "",
                hotline: "",
            },
            companyEditErr: {
                name: "",
                locate: "",
                email: "",
                hotline: "",
            },
            show: '',
            isSubmit: false,
            isOpen: false,
        }
    }
    notify(msg, time) {
        // debugger
        return toast.success(msg, time)
    };
    toggleModal = (show, companyEdit) => {
        let isOpen = true;
        this.setState({
            isOpen,
            show,
            companyEdit,

        });
    };
    toggleModalClose = () => {
        let companyErr = {
            name: "",
            locate: "",
            email: "",
            hotline: "",
        };
        let companyEditErr = {
            name: "",
            locate: "",
            email: "",
            hotline: "",
        }
        let isOpen = false;
        this.setState({
            isOpen,
            companyEditErr,
            companyErr,
            company: {
                name: "",
                locate: "",
                email: "",
                hotline: "",
            },
        });
    };
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await companiesPagingApi().getPaging({ search });
        if (response) {
            console.log(response.data);
            this.setState({ companies: response.data, totalPage: response.total_rows })
            return toast.success(response.msg, { autoClose: 1000 });
        }
        else {
            return toast.success(response.msg)
        }
    }
    getPageChange = async (current_page, rows) => {
        let response = await companiesPagingApi().getPaging({ current_page, rows });
        if (response) {
            this.setState({ companies: response.data })
            this.notify(response.msg, { autoClose: 1000 });
        } else {
            this.notify(response.msg, { autoClose: 5000 });
        }
    }
    handleChangeAdd = (e) => {
        let { value, name, required } = e.target;
        let company = { ...this.state.company, [name]: value };
        let errorMessage = '';
        if (required) {
            if (value.trim() === '') {
                errorMessage = 'Không được để trống trường dữ liệu này'
            }
        }
        if (name === 'email') {
            let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!regex.test(value)) {
                errorMessage = 'Không đúng định dạng';
            }
        }
        if (name === 'hotline') {
            let regex = /^[0-9\-\+]{9,15}$/
            if (!regex.test(value)) {
                errorMessage = 'Không đúng định dạng';
            }
        }
        let companyErr = { ...this.state.companyErr, [name]: errorMessage }
        this.setState({
            company,
            companyErr,
            isSubmit: false
        })
    }
    addCompany = async () => {
        let { company, companyErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        for (let key in companyErr) {
            if (companyErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in company) {
            if (company[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid) {
            //alert thành công
            let response = await companiesApi().create(this.state.company);
            if (response) {
                this.getPaging();
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false,
                    company: {
                        name: "",
                        locate: "",
                        email: "",
                        hotline: "",
                    }
                })
                this.notify(response.msg, { autoClose: 1000 });
            } else {
                this.notify(response.msg, { autoClose: 5000 });
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
    handleChangeEdit = (e) => {
        let { value, name, required } = e.target;
        let companyEdit = { ...this.state.companyEdit, [name]: value };
        let errorMessage = '';
        if (required) {
            if (value === '') {
                errorMessage = 'Không được để trống trường dữ liệu này'
            }
        }
        if (name === 'email') {
            let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!regex.test(value)) {
                errorMessage = 'Không đúng định dạng';
            }
        }
        if (name === 'hotline') {
            let regex = /^[0-9\-\+]{9,15}$/
            if (!regex.test(value)) {
                errorMessage = 'Không đúng định dạng';
            }
        }
        let companyEditErr = { ...this.state.companyEditErr, [name]: errorMessage }
        this.setState({
            companyEdit,
            companyEditErr,
            isSubmit: false
        })
    }
    updateCompany = async (company) => {
        let { companyEdit, companyEditErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        for (let key in companyEditErr) {
            if (companyEditErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in companyEdit) {
            if (companyEdit[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid) {
            //alert thành công
            let response = await companiesApi().update(company, company.id);
            if (response) {
                this.getPaging();
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false
                })
                this.notify(response.msg, { autoClose: 1000 });
            } else {
                this.notify(response.msg, { autoClose: 5000 });
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
    deleteCompany = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            let response = await companiesApi().delete(id);
            if (response) {
                this.getPaging();
                this.notify(response.msg, { autoClose: 1000 });
            } else {
                this.notify(response.msg, { autoClose: 5000 });
            }
        } else {
        }
    }
    renderCompany = () => {
        // let start = (this.state.page - 1) * this.state.itemPage;
        // let end = this.state.page * this.state.itemPage;
        return
    }
    renderModal = () => {
        return (<ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
            <div className="modal-header ">
                <h5 className="modal-title">
                    Thêm sản phẩm
                        </h5>
                <button type="button" className="close" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="form-group mb-0 px-5 form__fix " >
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Tên: </label>
                <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" placeholder='Tên công ty' required />
                <p className='text-danger m-0' >{this.state.companyErr.name}</p>
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Hãng: </label>
                <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='locate' type="text" className="form-control" aria-describedby="helpId" placeholder='Địa chỉ' required />
                <p className='text-danger m-0' >{this.state.companyErr.locate}</p>
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Giá gốc: </label>
                <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='email' type="email" className="form-control" aria-describedby="helpId" placeholder='Email' required />
                <p className='text-danger m-0' >{this.state.companyErr.email}</p>
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Giá bán: </label>
                <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='hotline' type="text" className="form-control" aria-describedby="helpId" placeholder='Hotline' required />
                <p className='text-danger m-0' >{this.state.companyErr.hotline}</p>
                <label> Loại: </label>
                <input onChange={this.handleChangeAdd} name='webstie' type="text" className="form-control" aria-describedby="helpId" placeholder='Website' />
                <label> Hình: </label>
                <input onChange={this.handleChangeAdd} name="logo" accept="image/png, image/jpeg" type="file" className="d-block" />
                <label> Chi tiết: </label>
                <textarea onChange={this.handleChangeAdd} name='webstie' type="text" rows ="5" className="form-control" aria-describedby="helpId" placeholder='Website' />
                <label ></label>
                <br />
                {/* <div className="custom-file">
                             <label name='logo' className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                        </div> */}
            </div>
            <div className="modal-footer">
                <button onClick={this.addCompany} type='submit' className="btn btn-primary">Thêm</button>
            </div>
        </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0 mb-0 body">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} type={'companyAdd'} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0">
                            <thead>
                                <tr className="table-dark mx-2 text-dark">
                                    <th >Tên</th>
                                    <th >Hình ảnh</th>
                                    <th >Loại</th>
                                    <th >Hãng</th>
                                    <th >Chi tiết</th>
                                    <th >Giá bán</th>
                                    <th >Giá gốc</th>
                                    <th >Lượt xem</th>
                                    <th >Ngày tạo</th>
                                    <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.companies.map((company, index) => {
                                    return (
                                        <tr className='ml-2' style={{ width: '99%' }} key={index}>
                                            <td>{company.name}</td>
                                            <td>{company.locate}</td>
                                            <td>{company.email}</td>
                                            <td>{company.hotline}</td>
                                            <td>{company.webstie}</td>
                                            <td>{company.locate}</td>
                                            <td>{company.email}</td>
                                            <td>{company.hotline}</td>
                                            <td>{company.webstie}</td>
                                            <td className='text-right'>
                                                <button onClick={() => this.toggleModal('companyEdit', company)} className="button p-0 mr-1 btn-success" >
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.deleteCompany(company.id) }} className="button btn-danger p-0" >
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
                <div className="card-footer border-0 d-flex p-0">
                    <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} />
                </div>
                <ToastContainer />
            </div>
        )
    }
}
