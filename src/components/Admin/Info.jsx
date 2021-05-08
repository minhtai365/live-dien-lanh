import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import { questionsPagingApi } from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';
import '../../css/table.css';
import '../../css/header.css';
export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: '',
            isSubmit: false

            ,
            questions: []

        }
    }
    //call API
    async componentWillMount() {
        await this.getPaging();
    }

    getPaging = async (search) => {
        let response = await questionsPagingApi().getPaging({ search });
        if (response) {
            this.setState({ questions: response.data, totalPage: response.total_rows })
            return toast.success(response.msg, { autoClose: 1000 });
        }
        else {
            return toast.error(response.msg)
        }

    }

    toggleModal = (show) => {
        let isOpen = true;
        console.log();
        this.setState({
            isOpen,
            show,

        });
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.setState({
            isOpen
        });
    };
    handleChangeAdd = (e) => {
        let { value, name } = e.target;
        let question = { ...this.state.question, [name]: value };
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let questionErr = { ...this.state.questionErr, [name]: errorMessage }
        this.setState({
            question,
            questionErr,
            isSubmit: false
        })
    }

    addQuestion = async () => {
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
            //alert thành công
            this.state.question.active = 1;
            // let response = await apiQuestions().create(this.state.question);
            // if (response) {
            //     this.getPaging();
            //     let isOpen = false;
            //     this.setState({
            //         isOpen,
            //         isSubmit: false,
            //         question: {
            //             title: "",
            //             questiontype_id: ""
            //         }
            //     })
            //     this.notify(response.msg, { autoClose: 1000 });
            // } else {
            //     this.notify(response.msg, { autoClose: 5000 });
            // }
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
        let { value, name } = e.target;
        let questionEdit = { ...this.state.questionEdit, [name]: value };
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = 'Không được để trống trường dữ liệu này'
        }
        let questionEditErr = { ...this.state.questionEditErr, [name]: errorMessage }
        this.setState({
            questionEdit,
            questionEditErr,
            isSubmit: false
        })
    }
    updateQuestion = async () => {
        let { questionEdit, questionsEditErr } = this.state;
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
        for (let key in questionsEditErr) {
            if (questionsEditErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc chưa chọn loại</p>`
            }
        };
        for (let key in questionEdit) {
            if (questionEdit[key] === '' || questionEdit[key] === 'Chọn loại...') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc chưa chọn loại</p>`
            }
        }
        if (valid) {
            //alert thành công
            // let response = await apiQuestions().update(this.state.questionEdit, this.state.questionEdit.id);
            // if (response) {
            //     this.getPaging();
            //     let isOpen = false;
            //     this.setState({
            //         isOpen,
            //         isSubmit: false
            //     })
            //     this.notify(response.msg, { autoClose: 1000 });
            // } else {
            //     this.notify(response.msg, { autoClose: 5000 });
            // }
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
    deleteQuestion = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            // let response = await apiQuestions().delete(id);
            // if (response) {
            //     this.getPaging();
            //     this.notify(response.msg, { autoClose: 1000 });
            // } else {
            //     this.notify(response.msg, { autoClose: 5000 });
            // }
        } else {
        }
    }
    UpdateActive = async (active, id) => {
        if (this.state.questions) {
            let objques = this.state.questions.filter(ques => ques.id === id);
            objques[0].active = active
            // let response = await apiQuestions().update(objques[0], id);
            // if (response.status) {
            //     this.setState({ isSubmit: false });
            //     this.getPaging();
            //     this.notify(response.msg);
            // } else {
            //     this.notify(response.msg);
            // }
        }

    }


    render() {
        return (
            <div>
                <div className="modal-header">
                    <h5 className="modal-title">
                        Thông tin
                        </h5>
                    <div className="modal-footer">
                        <button onClick={this.addQuestion} type='submit' className="btn btn-primary">Lưu</button>
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Tên: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Phone: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Email: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                </div>

                <div className="row">
                <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Facebook: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Zalo: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Tiktok: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Địa chỉ: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Logo: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Map: </label>
                        <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>chính sách thanh toán: </label>
                        <textarea onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Chính sách vận chuyển: </label>
                        <textarea onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                    <div className="form-group col-4 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Chính sách bảo hành: </label>
                        <textarea onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-12 ">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label>Giới thiệu: </label>
                        <textarea onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" rows="4" className="form-control" aria-describedby="helpId" />
                    </div>
                </div>
                {/* <p className='text-danger' >{this.state.questionErr.title}</p> */}
                {/* <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Loại câu hỏi: </label>
                <select onChange={this.handleChangeAdd} className="custom-select" name='questiontype_id'>
                    <option  >Chọn loại...</option>
                    {this.state.typeQuestion.map((type, index) => {
                        return (
                            <option key={index} value={type.id}>{type.name}</option>
                        )
                    })}
                </select> */}

                <ToastContainer />
            </div>
        )
    }
}