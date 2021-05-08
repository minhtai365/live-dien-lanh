import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import { getSlideApi,setSlideApi} from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';

import '../../css/table.css';
import '../../css/header.css';
export default class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPage: 10,
            colors: [],
            show: '',
            isSubmit: false,
            isOpen: false,
            color: {
                name: '',
                color: '',
                min: '',
                max: '',
            },
            colorErr: {
                name: '',
                color: '',
                min: '',
                max: '',
            },
            editColor: {
                name: '',
                color: '',
                min: '',
                max: '',
            },
            editColorErr: {
                name: '',
                color: '',
                min: '',
                max: '',
            }
        }
    }
    notify(msg, time) {
        // debugger
        return toast.success(msg, time)
    };
    toggleModal = async (show, color) => {
        let isOpen = true;
        this.setState({
            isOpen,
            show,
            editColor: color,
        });
    };
    toggleModalClose = () => {
        let colorErr = {
            name: '',
            color: '',
            min: '',
            max: '',
        };
        let editColorErr = {
            name: '',
            color: '',
            min: '',
            max: '',
        }
        let isOpen = false;
        this.setState({
            colorErr,
            editColorErr,
            isOpen,
            color: {
                name: '',
                color: '',
                min: '',
                max: '',
            },
        });
    };
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getSlideApi().getPaging({ search });
        if (response) {
            this.setState({ slides: response})
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }
    updateColor = async () => {
        let { editColor, editColorErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        for (let key in editColorErr) {
            if (editColorErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in editColor) {
            if (editColor[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid && editColor.min < editColor.max && editColor.min > 0 && editColor.max > 0) {
            //alert thành công
           
        } else {
            //
            Swal.fire({
                icon: 'error',
                html: errorContent === '' ? 'Điểm không hợp lệ' : errorContent,
                confirmButtonText: 'Trở về'
            })
            return;
        }

    }
    addColor = async () => {
        let { color, colorErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({
                isSubmit: true
            });
        }
        for (let key in colorErr) {
            if (colorErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in color) {
            if (color[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid && color.min < color.max && color.min > 0 && color.max > 0) {
            //alert thành công
                this.getPaging();
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false,
                    color: {
                        name: '',
                        color: '',
                        min: '',
                        max: '',
                    },
                })
            //
            Swal.fire({
                icon: 'error',
                html: errorContent === '' ? 'Điểm không hợp lệ' : errorContent,
                confirmButtonText: 'Trở về'
            })
            return;
        }
    }
    deleteColor = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
                this.getPaging();
        } else {

        }

    }

    handleChangeAdd = (e) => {
        let { value, name } = e.target;
        let color = { ...this.state.color, [name]: value };
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let colorErr = { ...this.state.colorErr, [name]: errorMessage }
        this.setState({
            color,
            colorErr,
            isSubmit: false
        })
    }
    handleChangeEdit = (e) => {
        let { value, name } = e.target;
        let editColor = { ...this.state.editColor, [name]: value };
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let editColorErr = { ...this.state.editColorErr, [name]: errorMessage }
        this.setState({
            editColor,
            editColorErr,
            isSubmit: false
        })
    }
    renderModal = () => {
        return (
            <ModalForm show={this.state.isOpen} size='md' onClose={this.toggleModalClose}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        Thêm slide
                        </h5>
                    <button type="button" className="close" onClick={this.toggleModalClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="form-group px-5 pt-4 ">
                    <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                    <label> Chọn màu: </label>
                    <div className="d-flex">
                        <input onChange={this.handleChangeAdd} name='color' className='p-0' type='file' style={{ height: '38px', width: '41px', border: 'none' }} />
                    </div>
                    <p className='text-danger' >{this.state.colorErr.color}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={this.addColor} type='submit' className="btn btn-primary">Thêm</button>
                </div>
            </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0 body mb-0">
                    <TableHeader toggleModal={this.toggleModal} getPaging={this.getPaging} type={'colorAdd'} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className='col-7'>Hình ảnh</th>
                                    <th className='col-1'>Trạng thái</th>
                                    <th className='col-2'>Ngày tạo</th>
                                    <th className='col-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.colors.map((color, index) => {
                                    return (<tr className=' ml-2' style={{ width: '99%' }} key={index}>
                                        <td className='col-7'><div style={{ width: '30px', height: '30px', backgroundColor: `${color.color}` }}></div></td>
                                        <td className='col-1'>
                                                <input className='active__check' type="checkbox" />
                                            </td >
                                        <td className='col-2'>{color.modify_date === '' ? color.created_date : color.modify_date}</td>
                                        <td className='text-right col-2'>
                                            <button onClick={() => { this.toggleModal('colorEdit', color) }} className="button btn-success p-0 mr-1">
                                                {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                            </button>
                                            <button onClick={() => { this.deleteColor(color.id) }} className="button p-0 btn-danger" >
                                                {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                            </button>
                                        </td>
                                    </tr>)
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
