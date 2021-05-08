import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import { setPromotionApi, getPromotionApi } from '../../custom/repositories/api.repository';
import Rating from '../Share/Rating';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Swal from 'sweetalert2';

import '../../css/table.css';
import '../../css/header.css';
export default class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formReviewAdd: '',
            formReviewChange: '',
            questionAdd: null,
            totalPage: 10,
            listQuestionSelect: [],
            reviews: [],
            questions: [],
            company: [],
            questionTypes: [],
            arrQuestionAdd: [],
            arrQuestionChange: [],
            reviewQuestions: [],
            formReviews: [],
            isOpen: false,
            show: '',
            addQues: 1,
            isSubmit: false,
            err: '',
            showCompany: true
        }
    }
    async componentWillMount() {
        await this.getPaging();
    }
    getPaging = async () => {
        let response = await getPromotionApi().getPaging();
        if (response) {
            this.setState({ promotion: response })
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

    async updateFormReview() {
        if (this.state.formReviewChange.trim() === '' || this.state.arrQuestionChange.length === 0) {
            this.setState({ err: 'Không được để trống trường dữ liệu này' })
            Swal.fire({
                icon: 'error',
                html: "Không hợp lệ hoặc không có dữ liệu !!!",
                confirmButtonText: 'Trở về'
            })
            return;
        }
        else {
            let ques = [...this.state.arrQuestionChange];
            let q = [];
            ques.map(x => {
                let dataQ = {}
                if (x.question_id) {
                    dataQ.id = x.id;
                    dataQ.question_id = x.question_id;
                }
                else {
                    dataQ.question_id = x.id;
                }
                dataQ.question_name = x.title;
                dataQ.reqview_id = this.state.reviews.questions[0].review_id;
                q.push(dataQ);
            })
            let dataUpDate = {};
            dataUpDate.name = this.state.formReviewChange;
            dataUpDate.questions = q;
            if (this.state.isSubmit) {
                return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
            }
            else {
                this.setState({ isSubmit: true });
            }
        }
    }
    async addFormReview() {
        let formReview = {};
        let ques = [...this.state.arrQuestionAdd];
        let q = [];
        ques.map(x => {
            let dataQ = {}
            dataQ.question_id = x.id;
            dataQ.question_name = x.title;
            dataQ.active = "active";
            q.push(dataQ);
        });
        if (!this.state.formReviewAdd || !this.state.formReviewAdd || this.state.arrQuestionAdd.length === 0) {
            this.setState({ err: 'Không được để trống trường dữ liệu này' })
            Swal.fire({
                icon: 'error',
                html: "Không hợp lệ hoặc không có dữ liệu !!!",
                confirmButtonText: 'Trở về'
            })
            return;
        }
        else {
            formReview.name = this.state.formReviewAdd;
            formReview.company_id = sessionStorage.getItem('companyID');
            formReview.total_rating = 0;
            formReview.questions = q;

            if (this.state.isSubmit) {
                return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
            }
            else {
                this.setState({ isSubmit: true });
            }
         
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
        this.setState({ [name]: value })
    }
    // handleCompanyAdd = companyAdd => {
    //     this.setState({ companyAdd });
    // };
    // handleCompanyChange = companyChange => {
    //     this.setState({ companyChange });
    // };
    handleQuestionAdd = questionAdd => {
        let listQuestion = [...this.state.arrQuestionAdd];
        listQuestion.unshift(questionAdd);
        let dt = [];
        this.state.questions.map(q => {
            let find = listQuestion.find(x => x.id === q.id);
            if (!find) {
                dt.push(q);
            }
        })
        this.setState({
            questionAdd: null,
            arrQuestionAdd: listQuestion,
            questions: dt,
        })
    };
    handleQuestionChange = questionChange => {
        let listQuestion = [...this.state.arrQuestionChange];
        listQuestion.unshift(questionChange);
        let dt = [];
        this.state.questions.map(q => {
            let find = listQuestion.find(x => x.id === q.id);
            if (!find) {
                dt.push(q);
            }
        })
        this.setState({
            questionChange: null,
            arrQuestionChange: listQuestion,
            questions: dt,
        })
    };
    notify(msg, time) { return toast.success(msg, time) };
    // TOGGLEMODAL
    toggleModal = (show, detail) => {
        if (detail) {
            this.getReview(detail);
        }
        else {
            this.getAllQuestion();
        }
        let isOpen = true;
        this.setState({
            isOpen,
            idDetail: detail,
            show,
        })
    };
    toggleModalClose = () => {
        let isOpen = false;
        this.getAllQuestion();
        this.setState({
            isOpen, arrQuestionAdd: [], arrQuestionChange: [], companyAdd: null, formReviewChange: '', formReviewAdd: ''
        });
    };
    renderSelectQues = () => {
        return (
            <div className='col-12'
            //  style={{left:'-25px'}}
            >
                <Select
                    options={this.state.questions}
                    getOptionLabel={(option) => option.title}
                    getOptionValue={(option) => option.id}
                    value={this.state.questionAdd}
                    onChange={this.handleQuestionAdd} />

                <div style={{ fontSize: '10px', color: 'red', }}> {this.state.arrQuestionAdd.length === 0 && this.state.err}</div>
            </div>
        )
    }
    renderModal = () => {
        return (
            <ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        Thêm form Review
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
                                className="form-control" name="formReviewAdd" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
                        </div>
                    </div>
                </div>
                <div className="row pl-4 pr-4 pb-4">
                    <div className="col-12"><span style={{ fontSize: '20px', color: 'red' }}>*</span>Chi tiết:</div>
                    <div className="col-12">
                        <input type="text"
                            className="form-control" name="formReviewAdd" onChange={(e) => this.handleChange(e)} aria-describedby="helpId" />
                    </div>
                </div>
                <div className="modal-footer pl-4 pr-4">
                    <button type='submit' onClick={() => this.addFormReview()} className="btn btn-primary ml-auto">Thêm</button>
                </div>
            </ModalForm>
        )

    }
    renderFormReview = () => {
        return this.state.formReviews.map((formReview, index) => {
            return (
                <tr key={index}>
                    <td>{formReview.name}</td>
                    <td>{formReview.companyname}</td>
                    <td>
                        <input onChange={() => this.UpdateActive(formReview.active === "active" ? 'inactive' : "active", formReview.id)}
                            type="checkbox" defaultChecked={formReview.active === "active" ? true : false} className='active' />
                    </td >
                    <td>{formReview.modify_date === '' ? formReview.created_date : formReview.modify_date}</td>
                    <td className='text-right'>
                        <button onClick={() => this.toggleModal('formReviewDetail', formReview.id)} className="button p-0 btn-primary mr-1"  >
                            {/* <SVG src={require('../../css/icons/eye-closeup.svg')} style={{ height: '20px', fill: 'white' }} */}
                            {/* /> */}
                        </button>
                        <button onClick={() => this.toggleModal('formReviewEdit', formReview.id)} className="button btn-success p-0 mr-1" >
                            {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                        </button>
                        <button onClick={() => this.deleteFormReview(formReview.id)} className="button p-0 btn-danger"  >
                            {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                        </button>
                    </td>
                </tr>
            )
        })
    }
    showModal = (status) => {
        if (status) {
            return (`${this.state.reviews.name} công ty  ${this.state.reviews.length !== 0 && this.state.reviews.questions[0].name}`);
        } else {
            return this.state.reviews.length !== 0 && this.state.reviews.questions.map((question, index) => {
                return (
                    <tr className="row" key={index}>
                        <div className="col-8">{question.title}</div>

                        <div className='p-0 col-4'>{question.type === 'rate' ? <Rating access={true} /> :
                            // <div className="form-group col-4 w-100">
                            <input disabled type='text' className="form-control" style={{ marginRight: '10px', marginTop: '10px', width: '100%' }} placeholder='Trả lời' />
                            // </div>
                        }</div>
                    </tr>
                )
            })
        }
    }
    editForm = (type) => {
        return <div className=" mt-4" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '380px' }}> {this.state.reviews.length !== 0 && this.state.arrQuestionChange.map((question, index) => {
            return (<div key={index} className="row pl-5 pt-1 pr-5">
                <div>
                    <div style={{ color: 'black', float: 'left', marginRight: '5px', marginTop: '-5px' }}>{index + 1}</div>
                    <div key={index} onClick={() => this.deleteSelectQuestionEdit(index)} className="show-ques"
                    >{question.title}
                        {/* <SVG src={require('../../css/icons/close.svg')} className="ml-3 delete" style={{ width: '20px' }} /> */}
                    </div>
                </div>
            </div>
            )
        })
        }
        </div>
    }
    render() {
        return (
            <div>
                {this.renderModal()}
                <div className="card border-0  body2">
                    <TableHeader toggleModal={this.toggleModal} getPaging={this.getPagingFormReview} type='formReviewAdd' />
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
                                {this.state.formReviews.map((formReview, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{formReview.name}</td>
                                            <td>{formReview.companyname}</td>
                                            <td>
                                                <input className='active__check' onChange={() => this.UpdateActive(formReview.active === "active" ? 'inactive' : "active", formReview.id)}
                                                    type="checkbox" checked={formReview.active === "active" ? true : false} />
                                            </td >
                                            <td>{formReview.modify_date === '' ? formReview.created_date : formReview.modify_date}</td>
                                            <td className='text-right'>
                                                <button onClick={() => this.toggleModal('formReviewEdit', formReview.id)} className="button btn-success p-0 mr-1" >
                                                    {/* <SVG src={require('../../css/icons/edit.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                                                </button>
                                                <button onClick={() => this.deleteFormReview(formReview.id)} className="button p-0 btn-danger"  >
                                                    {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer d-flex p-0">
                        <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} />
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
