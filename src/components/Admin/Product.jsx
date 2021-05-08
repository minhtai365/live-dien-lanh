import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import { getProductApi, setProductApi, deleteApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';

import '../../css/table.css';
import '../../css/header.css';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPage: 10,
            products: [],
            isSubmit: false,
            isOpen: false,
        }
    }
    notify(mess, time) {
        return toast.success(mess, time)
    };
    toggleModal = () => {
        let isOpen = true;
        this.setState({
            isOpen

        });
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.setState({
            isOpen,
        });
    };
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getProductApi().getPaging({ search });
        if (response) {
            this.setState({ companies: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.success("Thành công")
        }
    }
    // getPageChange = async (current_page, rows) => {
    //     let response = await companiesPagingApi().getPaging({ current_page, rows });
    //     if (response) {
    //         this.setState({ companies: response.data })
    //         this.notify(response.msg, { autoClose: 1000 });
    //     } else {
    //         this.notify(response.msg, { autoClose: 5000 });
    //     }
    // }
    handleChange = (e) => {
        const { value, name, required } = e.target;
        //  [name]: value };
        let errorMessage = '';
        if (required) {
            if (value.trim() === '') {
                errorMessage = 'Không được để trống trường dữ liệu này'
            }
        }
        // if (name === 'email') {
        //     let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        //     if (!regex.test(value)) {
        //         errorMessage = 'Không đúng định dạng';
        //     }
        // }
        // if (name === 'hotline') {
        //     let regex = /^[0-9\-\+]{9,15}$/
        //     if (!regex.test(value)) {
        //         errorMessage = 'Không đúng định dạng';
        //     }
        // }
        let companyErr = { ...this.state.companyErr, [name]: errorMessage }
        this.setState({
            companyErr,
            pro:{...this.state.pro,[name]:value},
            isSubmit: false
        })
    }
    setProduct = async () => {
        const { pro, companyErr } = this.state;
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
        for (let key in pro) {
            if (pro[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid) {
            
            // let obj={};
            // if(this.state.cate){
                // obj=this.state.cate;
            // }
            // obj.name=this.state.name;
            console.log(this.state.pro);
            let response = await setProductApi().set(this.state.pro);
            if (response) {
                this.getPaging();
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false
                })
                toast(response.mess, { autoClose: 1000 });
            } else {
                toast(response.mess, { autoClose: 5000 });
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
    delete = async (pro) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            // let response = await companiesApi().delete(id);
            // if (response) {
            //     this.getPaging();
            //     this.notify(response.msg, { autoClose: 1000 });
            // } else {
            //     this.notify(response.msg, { autoClose: 5000 });
            // }
        } else {
        }
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
                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Tên: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" className="form-control" aria-describedby="helpId" placeholder='Tên Sản phẩm' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Hãng: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='producer' type="text" className="form-control" aria-describedby="helpId" placeholder='Hãng' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá gốc: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" className="form-control" aria-describedby="helpId" placeholder='Giá gốc' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.email}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá bán: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='sale' type="text" className="form-control" aria-describedby="helpId" placeholder='Giá bán' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Loại: </label>
                        <input onChange={this.handleChange} name='type' type="text" className="form-control" aria-describedby="helpId" placeholder='Loại danh mục' />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.email}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Hình: </label>
                        <input onChange={this.handleChange} name="img" accept="image/png, image/jpeg" type="file" placeholder='Hình sản phẩm' className="d-block" />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                </div>

                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Chi tiết: </label>
                <textarea onChange={this.handleChange} name='detail' type="text" rows="5" className="form-control" aria-describedby="helpId" placeholder='Chi tiết' />
                <label ></label>
                <br />
                {/* <div className="custom-file">
                             <label name='logo' className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                        </div> */}
            </div>
            <div className="modal-footer">
                <button onClick={this.setProduct} type='submit' className="btn btn-primary">Thêm</button>
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
                                <tr className="mx-2 text-dark">
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
                                {this.state.products.map((pro, index) => {
                                    return (
                                        <tr className='ml-2' style={{ width: '99%' }} key={index}>
                                            <td>{pro.name}</td>
                                            <td>{pro.img}</td>
                                            <td>{pro.type}</td>
                                            <td>{pro.producer}</td>
                                            <td>{pro.detail}</td>
                                            <td>{pro.price}</td>
                                            <td>{pro.sale}</td>
                                            <td>{pro.view}</td>
                                            <td>{pro.createdlc}</td>
                                            <td className='text-right'>
                                                <button onClick={() => this.toggleModal(pro)} className="button p-0 mr-1 btn-success" >
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.delete(pro) }} className="button btn-danger p-0" >
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
                    {/* <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} /> */}
                </div>
                <ToastContainer />
            </div>
        )
    }
}
