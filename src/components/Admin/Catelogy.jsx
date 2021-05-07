import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import TableHeader from '../Share/TableHeader';
import ModalForm from '../Modal/ModalForm';
import { ToastContainer, toast } from "react-toastify";
import { questionsPagingApi} from '../../custom/repositories/api.repository';
import Swal from 'sweetalert2';

export default class Catelogy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: '',
            isSubmit: false

            ,
            questions:[]

        }
    }
    //call API
    async componentWillMount() {
        await this.getPaging();
        await this.getQuestionsType()
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
    getQuestionsType = async () => {
        // let response = await apipagingQuestionsType().getPaging({});
        // if (response) {
        //     this.setState({ typeQuestion: response.data })
        // }
        // else {
        // }
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

    renderModal = () => {
        return (<ModalForm show={this.state.isOpen} size='md' onClose={this.toggleModalClose}>
            <div className="modal-header">
                <h5 className="modal-title">
                    Thêm danh mục
                        </h5>
                <button type="button" className="close" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="form-group px-5 pt-4 ">
                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label>Tên: </label>
                <input onChange={this.handleChangeAdd} onBlur={this.handleChangeAdd} name='name' type="text" className="form-control" aria-describedby="helpId" />
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
            </div>
            <div className="modal-footer">
                <button onClick={this.addQuestion} type='submit' className="btn btn-primary">Thêm</button>
            </div>
        </ModalForm>
        )
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0 mb-0 body">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} type='questionsAdd' />
                    <div className="card-body p-0 container__table container-fluid">
                        <table className="table mb-0 ">
                            <thead>
                                <tr className="table-dark mx-2 row text-dark">
                                    <th className='col-4'>Tên</th>
                                    <th className='col-3'>Số lượng</th>
                                    <th className='col-3'>Ngày tạo</th>
                                    <th className='col-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.questions.map((question, index) => {
                                    return (
                                        <tr className=' row ml-2' style={{ width: '99%' }} key={index}>
                                            <td className='col-4  '> {question.title} </td>
                                            <td className='col-3 '> {question.questiontype_id} </td>
                                            <td className="col-3 ">
                                                {question.active ? <input onChange={() => this.UpdateActive(0, question.id)} type="checkbox" className="active__check" name="active" defaultChecked /> : <input onChange={() => this.UpdateActive(1, question.id)} type="checkbox" name="active" />}
                                            </td ><td className='text-right col-2 '>
                                                <button onClick={() => this.toggleModal('questionsEdit', question)} className="button p-0 mr-1 btn-success">
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => { this.deleteQuestion(question.id) }} className="button p-0 btn-danger" >
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
                {/* <div className="card-footer border-0 d-flex p-0">
                    <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} />
                </div> */}
                <ToastContainer />
            </div>
        )
    }
}