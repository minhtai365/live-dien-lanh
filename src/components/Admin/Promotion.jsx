import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import { setPromotionApi, getPromotionApi } from '../../custom/repositories/api.repository';
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
            isOpen: false,
            isSubmit: false,
            err: '',
        }
    }
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async () => {
        let response = await getPromotionApi().getPaging();
        if (response) {
            this.setState({ promotions: response })
        }
        else {
        }
    }

    //AED

    UpdateActive = async (active, id) => {
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        let obj = {};
        obj.active = active;

    }
    async setPromotion() {
        let obj = {};
        if (this.state.promotion) {
            obj = this.state.promotion;
        }
        console.log(obj);
        console.log(this.state.promo);
        // obj.name = this.state.name;
        let response = await setPromotionApi().set(obj);
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
    deleteFormReview = async (id) => {
        console.log(id);
        if (window.confirm("Bạn có chắc muốn xóa?")) {

        } else {
            return
        }
    }
    // handleChange
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ ...this.state.promo, [name]: value })
    }
    notify(msg, time) { return toast.success(msg, time) };
    // TOGGLEMODAL
    toggleModal = (promotion = null) => {
        if (promotion) {
            this.setState({ name: promotion.name, promotion });
        }
        else {
            this.setState({ name: "", promotion });
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
    renderModal = () => {
        return (
            <ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        Thêm khuyến mãi
                    </h5>
                    <button type="button" className="close" onClick={this.toggleModalClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="row p-4 " >
                    <div className='row ml-1 mt-2 w-100'>
                        <div className='col-12'><span style={{ fontSize: '20px', color: 'red' }}>*</span> Tên: </div>
                        <div className="col-12">
                            <input type="text"
                                className="form-control" name="name" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
                        </div>
                    </div>
                </div>
                <div className="row pl-4 pr-4 pb-4">
                    <div className="col-12"><span style={{ fontSize: '20px', color: 'red' }}>*</span>Chi tiết:</div>
                    <div className="col-12">
                        <input type="text"
                            className="form-control" name="detail" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
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
                        <table className="table">
                            <thead>
                                <tr className="text-dark">
                                    <th>Tên</th>
                                    <th>Chi tiết</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.promotions.map((promo, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{promo.name}</td>
                                            <td>{promo.detail}</td>
                                            <td>
                                                <input className='active__check' onChange={() => this.UpdateActive()} type="checkbox" />
                                            </td >
                                            <td>{promo.createlc}</td>
                                            <td className='text-right'>
                                                <button onClick={() => this.toggleModal(promo)} className="button btn-success p-0 mr-1" >
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => this.delete(promo)} className="button p-0 btn-danger"  >
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
                <ToastContainer />
            </div>
        )
    }
}
