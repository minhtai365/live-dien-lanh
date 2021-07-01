import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import { setPromotionApi, getPromotionApi, deleteApi } from '../../custom/repositories/api.repository';
import Rating from '../Share/Rating';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';

import '../../css/table.css';
import '../../css/header.css';
export default class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotions: [],
            promotion: {},
            isOpen: false,
            isSubmit: false,
            err: '',
        }
    }
    async componentDidMount() {
        await this.getPaging();
    }
    getPaging = async () => {
        let response = await getPromotionApi().getPaging();
        if (response) {
            this.setState({ promotions: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.danger("Thất bại")
        }
    }

    //AED

    changeStatus = async (promo) => {
        let pro = promo;
        pro.status = !promo.status;
        let response = await setPromotionApi().set(pro);
        if (response) {
            this.getPaging();
            toast(response.mess, { autoClose: 1000 });
        } else {
            toast(response.mess, { autoClose: 5000 });
        }

    }
    async setPromotion() {
        let response = await setPromotionApi().set(this.state.promotion);
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

    }
    delete = async (pr) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            let response = await deleteApi().delete(pr);
            if (response.status) {
                this.getPaging();
                return toast.success(response.mess, { autoClose: 1000 });
            } else {
                return toast.danger(response.mess, { autoClose: 5000 });
            }
        } else {
            return
        }
    }
    // handleChange
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ promotion: { ...this.state.promotion, [name]: value } });
    }
    notify(msg, time) { return toast.success(msg, time) };
    // TOGGLEMODAL
    toggleModal = (promotion = null) => {
        if (promotion) {
            this.setState({ promotion });
        }
        else {
            this.setState({ name: "", promotion: {} });
        }
        let isOpen = true;
        this.setState({
            isOpen,
        })
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.setState({
            isOpen,
        });
    };
    formatDate = (str) => {
        return str.split(',').slice(0, 1).join('');
    }
    renderModal = () => {
        return (
            <ModalForm show={this.state.isOpen} size='md' onClose={this.toggleModalClose}>
                {/* <div className="d-flex justify-content-between"> */}
                <div className="modal-header">
                    <h5 className="modal-title">
                        Thêm khuyến mãi
                    </h5>
                    {/* </div> */}
                    <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="row p-4 " >
                    <div className='row ml-1 mt-2 w-100'>
                        <div className='col-md-1 col-12'><span style={{ fontSize: '20px', color: 'red' }}>*</span> Tên: </div>
                        <div className="col-md-1 col-12">
                            <input type="text" defaultValue={this.state.promotion.name}
                                className="form-control" name="name" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
                        </div>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-md-1 col-12"><span style={{ fontSize: '20px', color: 'red' }}>*</span>Chi tiết:</div>
                    <div className="col-md-1 col-12">
                        <textarea rows="4" type="text" defaultValue={this.state.promotion.content}
                            className="form-control" name="content" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
                    </div>
                </div>
                <div className="modal-footer pl-4 pr-4">
                    <button type='submit' onClick={() => this.setPromotion()} className="btn btn-primary ml-auto">Thêm</button>
                </div>
            </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0  body2">
                    <TableHeader toggleModal={this.toggleModal} />
                    <div className="card-body p-0 container__table">
                        <table className="table mb-0 text-center table-striped">
                            <thead>
                                <tr className="text-dark">
                                    <th className="col-md-2 col-3">Tên</th>
                                    <th className="col-md-4 col-5">Chi tiết</th>
                                    <th className="col-md-2 d-none d-md-table-cell">Ngày tạo</th>
                                    <th className="col-md-2 col-2">Hiện</th>
                                    <th className="col-md-2 col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.promotions.map((promo, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="col-md-2 col-3" >{promo.name}</td>
                                            <td className="col-md-4 col-5" title={this.formatDate(promo.createdlc)} >{promo.content}</td>
                                            <td className="col-md-2 d-none d-md-table-cell" >{this.formatDate(promo.createdlc)}</td>
                                            <td className="col-md-2 col-2" >
                                                <input className='active__check' name="status" checked={promo.status} onChange={() => this.changeStatus(promo)} type="checkbox" />
                                            </td >
                                            <td className="col-md-2 col-2" className='text-right'>
                                                <button onClick={() => this.toggleModal(promo)} title="Sửa" className="button btn-success p-0 mr-1" >
                                                    <i className="fas fa-edit"></i>
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => this.delete(promo)} title="Xóa" className="button p-0 btn-danger"  >
                                                    <i className="fas fa-trash-alt"></i>
                                                    {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '20px', fill: 'white' }} /> */}
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
