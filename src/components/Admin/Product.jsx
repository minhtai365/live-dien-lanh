import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import { getProductApi, setProductApi, deleteApi, getCateApi } from '../../custom/repositories/api.repository';
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
            pro:{},
            catelogies: [],
            isSubmit: false,
            isOpen: false,
        }
    }
    notify(mess, time) {
        return toast.success(mess, time)
    };
    toggleModal = (pro=null) => {
        if(pro){
            this.setState({pro});
        }
        else{
            this.setState({pro:{}});
        }
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
    async componentDidMount() {
        await this.getPaging();
        await this.getCatePaging();
    }
    getPaging = async (search) => {
        let response = await getProductApi().getAll();
        if (response) {
            this.setState({ products: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.success("Thành công")
        }
    }
    getCatePaging = async (search) => {
        let response = await getCateApi().getPaging({ search });
        if (response) {
            this.setState({ catelogies: response })
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
            pro: { ...this.state.pro, [name]: value },
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
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false
                })

                this.getPaging();
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
            let response = await deleteApi().delete(pro);
            if (response) {
                this.getPaging();
                this.notify(response.msg, { autoClose: 1000 });
            } else {
                this.notify(response.msg, { autoClose: 5000 });
            }
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
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.pro.name} className="form-control" aria-describedby="helpId" placeholder='Tên Sản phẩm' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá bán: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='sale' type="text" defaultValue={this.state.pro.sale} className="form-control" aria-describedby="helpId" placeholder='Giá bán' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <label> Hãng: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='producer' type="text" defaultValue={this.state.pro.producer} className="form-control" aria-describedby="helpId" placeholder='Hãng' />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <label> Giá gốc: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro.price} className="form-control" aria-describedby="helpId" placeholder='Giá gốc' />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.email}</p> */}
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Loại: </label>
                        {/* <input onChange={this.handleChange} name='type' type="text" defaultValue={this.state.pro.} className="form-control" aria-describedby="helpId" placeholder='Loại danh mục' /> */}

                        <select onChange={this.handleChange} name='catelogyid' defaultValue={this.state.pro.catelogyid} className="form-control">
                            {this.state.catelogies.map((cate, index) => {
                                return (
                                    <option key={index} value={cate._id}>{cate.name}</option>
                                )
                            })}
                        </select>
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
                <textarea onChange={this.handleChange} name='detail' type="text" rows="5" defaultValue={this.state.pro.detail} className="form-control" aria-describedby="helpId" placeholder='Chi tiết' />
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
                                    <th className="col-1">Tên</th>
                                    <th className="col-2">Hình ảnh</th>
                                    <th className="col-1">Loại</th>
                                    <th className="col-1">Hãng</th>
                                    <th className="col-2">Chi tiết</th>
                                    <th className="col-1">Giá gốc</th>
                                    <th className="col-1">Giá bán</th>
                                    <th className="col-1">Lượt xem</th>
                                    <th className="col-1">Ngày tạo</th>
                                    <th className="col-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((pro, index) => {
                                    return (
                                        <tr className='ml-2' style={{ width: '99%' }} key={index}>
                                            <td className="col-1">{pro.name}</td>
                                            <td className="col-2">{pro.img}</td>
                                            <td className="col-1">{this.state.catelogies.filter(cate =>
                                                cate._id === pro.catelogyid).map((ca, i) => {
                                                    return <div key={i}>{ca.name}</div>
                                                })}
                                            </td>
                                            <td className="col-1">{pro.producer}</td>
                                            <td className="col-2">{pro.detail}</td>
                                            <td className="col-1">{pro.price}</td>
                                            <td className="col-1">{pro.sale}</td>
                                            <td className="col-1">{pro.view}</td>
                                            <td className="col-1">{pro.createdlc}</td>
                                            <td className="col-1" className='text-right'>
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
