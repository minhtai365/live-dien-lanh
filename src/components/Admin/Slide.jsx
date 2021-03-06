import React, { Component } from 'react';
import { toast } from "react-toastify";
import '../../css/header.css';
import '../../css/table.css';
// import SVG from 'react-inlinesvg';
import { changeStatusApi, deleteApi, getSlideApi, setSlideApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import TableHeader from './TableHeader';
export default class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            isSubmit: false,
            isOpen: false,
            fileInput: null,
            previewSource: null,
            choseFile: '',

        }
    }
    notify(msg, time) {
        return toast.success(msg, time)
    };
    toggleModal = async (slide = null) => {
        if (slide) {
            this.setState({ slide });
        }
        else {
            this.setState({ slide: null });
        }
        let isOpen = true;
        this.setState({
            isOpen,
        });
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.setState({
            isOpen,
            slide: null,
            previewSource: null
        });
    };
    async componentDidMount() {
        await this.getPaging();
    }
    getPaging = async (search) => {
        let response = await getSlideApi().getPaging({ search });
        if (response) {
            this.setState({ slides: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }

    setColor = async (evt) => {
        evt.preventDefault()
        if (!this.state.previewSource) return;
        this.uploadImage(this.state.previewSource);
        // const { slide, file } = this.state;
        // let formData = new FormData();
        // formData.append('slide', file);
        // if (slide) {
        //     formData.append('_id', slide._id);
        // }
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        // let response = await setSlideApi().addFile(formData, config);
        // if (response) {
        //     this.getPaging();
        //     let isOpen = false;
        //     this.setState({
        //         isOpen,
        //         isSubmit: false
        //     })
        //     toast(response.mess, { autoClose: 1000 });
        // } else {
        //     toast(response.mess, { autoClose: 5000 });
        // }
    }

    uploadImage = async (base64Encode) => {
        const { slide } = this.state;
        let _id = undefined;
        if (slide) {
            _id = slide._id
        }
        let response = await setSlideApi().addFile({ _id, base64Encode });
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
    deleteColor = async (slide) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            let response = await deleteApi().delete(slide);
            if (response) {
                this.getPaging();
                toast(response.msg, { autoClose: 1000 });
            } else {
                toast(response.msg, { autoClose: 5000 });
            }
        } else {

        }

    }

    handleChange = async (e) => {
        let { files } = e.target;
        const file = files[0];
        this.setState({
            file: file
        })
        let reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onloadend = async () => {
            await this.setState({ previewSource: reader.result });
        }
    }

    changeStatus = async (slide) => {
        let obj = slide;
        obj.status = !slide.status;
        let response = await changeStatusApi().set(obj);
        if (response) {
            this.getPaging();
            toast(response.msg, { autoClose: 1000 });
        } else {
            toast(response.msg, { autoClose: 5000 });
        }
    }
    formatDate = (str) => {
        return str.split(',').slice(0, 1).join('');
    }
    renderModal = () => {
        return (
            <ModalForm show={this.state.isOpen} size='md' onClose={this.toggleModalClose}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        {this.state.slide ? 'Sửa slide' : 'Thêm slide'}
                    </h5>
                    <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form encType="multipart/form-data">
                    <div className="form-group px-5 pt-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Chọn hình: </label>
                        <div className="d-flex">
                            <input onChange={this.handleChange} accept="image/png, image/jpeg" name='slide' className='p-0' type='file' />
                        </div>
                    </div>

                    <div className="form-group px-5 pt-4 ">
                        {this.state.previewSource && <img src={this.state.previewSource} alt="hinh" style={{ height: '120px', width: '200px' }} />}
                        {this.state.slide && <img width="200" height="100" src={this.state.slide.img} alt="hinh" />}
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={this.setColor}
                            type='submit' className="btn btn-primary">{this.state.slide ? 'Sửa' : 'Thêm'}</button>
                    </div>
                </form>

            </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0 body mb-0">
                    <TableHeader toggleModal={this.toggleModal} getPaging={this.getPaging}/>
                    <div className="card-body p-0 container__table  align-item-center ">
                        <table className="table mb-0 text-center  table-striped">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className='col-4
                                     text-center'>Hình ảnh</th>
                                    <th className='col-3 text-center'>Ngày tạo</th>
                                    <th className='col-3 text-center'>Hiện</th>
                                    <th className='col-2 text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.slides.map((slide, index) => {
                                    return (<tr className=' ml-2' key={index}>
                                        <td className='col-4 '>
                                            <div className="img-slide-resp m-auto">
                                                <img src={slide.img} alt="Hình"
                                                //  width="150" height="100" 
                                                />
                                            </div>
                                        </td>
                                        <td className='col-3 text-center'>{this.formatDate(slide.createdlc)}</td>
                                        <td className='col-3 text-center m-auto'>
                                            <input onChange={() => this.changeStatus(slide)} className='active__check' name="status" checked={slide.status} type="checkbox" />
                                        </td >
                                        <td className='text-right col-2 text-center '>
                                            <button onClick={() => { this.toggleModal(slide) }} title="Sửa" className="button btn-success p-0 mr-1">
                                                <i className="fas fa-edit"></i>
                                                {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                            </button>
                                            <button onClick={() => { this.deleteColor(slide) }} title="Xóa" className="button p-0 btn-danger" >
                                                <i className="fas fa-trash-alt"></i>
                                                {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                            </button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
