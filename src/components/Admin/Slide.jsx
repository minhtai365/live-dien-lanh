import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import { deleteApi, getSlideApi, setSlideApi, changeStatusApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import Axios from 'axios'
import '../../css/table.css';
import '../../css/header.css';
import { API_URL } from '../../config/_index';
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
        });
    };
    async componentWillMount() {
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

        if(!this.state.previewSource) return;
        this.uploadImage(this.state.previewSource);
        // const { slide, file } = this.state;
        // let formData = new FormData();
        // formData.append('slide', file);
        // if (slide) {
        //     console.log(slide);
        //     formData.append('_id', slide._id);
        // }
        // console.log(formData);
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

    uploadImage= async(base64Encode)=>{
        const { slide} = this.state;
        let _id = undefined;
        if(slide){
            _id=slide._id
        }
        console.log(base64Encode);
        let response = await setSlideApi().addFile({_id,base64Encode});
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

    handleChange =async (e) => {
        let { value, name, files } = e.target;
        const file = files[0];
        console.log(files);
        this.setState({
            file: file
        })
        let reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onloadend = async() => {
         await this.setState({ previewSource: reader.result });
            console.log(reader);
        }
    }
 
    changeStatus = async (slide) => {
        let obj = slide;
        obj.status = !slide.status;
        console.log(obj);
        let response = await changeStatusApi().set(obj);
        if (response) {
            this.getPaging();
            toast(response.msg, { autoClose: 1000 });
        } else {
            toast(response.msg, { autoClose: 5000 });
        }
    }
    formatDate =(str)=>{
       return str.split(',').slice(0,1).join('');
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
                <form encType="multipart/form-data">
                    <div className="form-group px-5 pt-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Chọn hình: </label>
                        <div className="d-flex">
                            <input onChange={this.handleChange} accept="image/png, image/jpeg" name='slide' className='p-0' type='file' />
                        </div>
                    </div>

                    <div className="form-group px-5 pt-4 ">
                        {this.state.previewSource && <img src={this.state.previewSource} alt="hinh" style={{ height: '200px' }} />}
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={this.setColor}
                            type='submit' className="btn btn-primary">Thêm</button>
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
                    <TableHeader toggleModal={this.toggleModal} getPaging={this.getPaging} type={'colorAdd'} />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className='col-4
                                     text-center'>Hình ảnh</th>
                                    <th className='col-3 text-center'>Trạng thái</th>
                                    <th className='col-3 text-center'>Ngày tạo</th>
                                    <th className='col-2 text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.slides.map((slide, index) => {
                                    return (<tr className=' ml-2' style={{ width: '99%' }} key={index}>
                                        <td className='col-4 text-center'>
                                            <div><img src={slide.img} alt="Hình" width="150" height="100" /></div>
                                            </td>
                                        <td className='col-3 text-center'>
                                            <input onChange={() => this.changeStatus(slide)} className='active__check' name="status" checked={slide.status} type="checkbox" />
                                        </td >
                                        <td className='col-3 text-center'>{this.formatDate(slide.createdlc)}</td>
                                        <td className='text-right col-2 text-center'>
                                            <button onClick={() => { this.toggleModal(slide) }} className="button btn-success p-0 mr-1">
                                                {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                            </button>
                                            <button onClick={() => { this.deleteColor(slide) }} className="button p-0 btn-danger" >
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
