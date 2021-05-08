import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';
import Panigation from '../Share/Panigation';
import Rating from '../Share/Rating';
import TableHeader from '../Share/TableHeader';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import { formReviewsPagingApi, questionAnswersApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';

import '../../css/table.css';
import '../../css/header.css';
export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allAnswers: [],
            resultQues: [],
            page: 1,
            totalPage: 1,
            results: [],
            formRv: [],
            detailResults: {},
            allAnswers: [],
            isOpen: false,
            show: '',
            isSubmit: false,

        }
    }
    notify(msg, time) {
        // debugger
        return toast.success(msg, time)
    };
    toggleModal = (detail, id) => {
        detail === 'detailForm' ? this.getReview(id) : this.getAllReview(id);
        let isOpen = true;
        this.setState({
            isOpen,
            show: detail
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
        // await this.getAllAnswers();
        // await this.getAllReviewAnswers();
    }
    getPaging = async (search) => {
        let response = await formReviewsPagingApi().getPaging({ search });
        if (response) {
            this.setState({ results: response.data, totalPage: response.total_rows }, () => console.log(this.state.results))
            return toast.success(response.msg, { autoClose: 1000 });
        }
        else {
            return toast.error(response.message)
        }
    }
    getPageChange = async (current_page, rows) => {
        let response = await formReviewsPagingApi().getPaging({ current_page, rows });
        if (response) {
            this.setState({ results: response.data, })
            this.notify(response.msg, { autoClose: 1000 });
        } else {
            this.notify(response.msg, { autoClose: 5000 });
        }
    }
    getReview = async (id) => {
        // let response = await apiReviewAnswers().getOne(id);
        // if (response) {
        //     this.setState({
        //         detailResults: response
        //     }, () => console.log(this.state.detailResults))
        //     return toast.success(response.msg, { autoClose: 1000 });
        // }
        // else {
        //     return toast.error(response.msg)
        // }
    }

    getAllReview = async (id) => {
        let response = await questionAnswersApi().getOne(id);
        if (response.status) {
            this.setState({
                allAnswers: response.questionanswers
            })
            return toast.success(response.msg, { autoClose: 1000 });
        }
        else {
            return toast.error(response.msg)
        }
    }
    // getAllAnswers = async () => {
    //     let response = await allAnswersApi().getAll();
    //     if(response){
    //         let allAnswer=response&&response.filter((res)=>{
    //             return res.rating===0 && !res.text 
    //         })
    //         this.setState({
    //             allAnswers:allAnswer
    //          },()=>console.log(this.state.allAnswers))
    //     }
    //     else{
    //     }
    // }
    // getAllReviewAnswers = async () => {
    //     let {results}=this.state;
    //     let nullResult=[];
    //     let formRv=[];
    //     let response = await allReviewAnswersApi().getAll();
    //     if(response){
    //         response.map((res)=>{
    //             let find=this.state.allAnswers.find(x=>x.review_answer_id===res.id)
    //             if(find){
    //                 nullResult.push(res)
    //             }
    //         })
    //         results&&results.map((res)=>{
    //             let find=nullResult.find(x=>x.review_id===res.id)
    //             if(find){
    //                 formRv.push(res);
    //             }
    //         })
    //         this.setState({
    //             formRv
    //         })
    //     }
    //     else{
    //     }
    // }
    // getReview = async (id) => {
    //     let response = await reviewAnswerApi().getOne(id);
    //     if (response) {
    //         console.log(response);
    //         this.setState({
    //             detailResults: response.data
    //         })
    //         return toast.success(response.msg,{autoClose:1000});
    //     }
    //     else{
    //         return toast.error(response.msg)
    //     }
    // }
    deleteReview = () => {
        Swal.fire({
            icon: 'error',
            html: 'Bạn không có quyền xóa!!',
            confirmButtonText: 'Trở về'
        })
    }
    renderReview = () => {
        return this.state.results.map((result, index) => {
            return (
                <tr className='row ml-2' style={{ width: '99%' }} key={index}>
                    <td className='col-3' > {result.name} </td>
                    <td className='col-2'> {result.companyname} </td>
                    <td className='col-2'> {parseFloat(result.key.percent).toFixed()} </td>
                    <td className='col-1'>
                        <div style={{ width: '30px', height: '30px', backgroundColor: `${result.color}` }} ></div>
                        {/* <input className='p-0 m-0' style={{ width: '30px', height: '30px' }} type="color" /> */}
                    </td>
                    <td className='col-2'>{result.created_date}</td>
                    <td className='text-right col-2'>
                        <button onClick={() => this.toggleModal('detailForm', result.id)} className="button p-0 mr-1 btn-primary" >
                            {/* <SVG src={require('../../css/icons/eye-closeup.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                        </button>
                        <button onClick={this.deleteReview} className="button p-0 btn-danger">
                            {/* <SVG src={require('../../css/icons/trash.svg')} style={{ height: '15px', fill: 'white' }} /> */}
                        </button>
                    </td>
                </tr>
            )
            // }
        })
    }
    showModal = (status) => {
        let { data } = this.state.detailResults
        if (status) {
            return data && data.length > 0 && data[0].formName;
            // console.log(this.state.detailResults);
        } else {
            return data && data.map((question, index) => {
                console.log(question);
                return (
                    <tr className=' row ml-2' style={{ width: '99%' }} key={index}>
                        <td className='col-6'>{question.title}</td>
                        <td className='col-2'>{parseFloat(question.avg).toFixed()}</td>
                        {/* <td className='col-4'>{question.text}</td>
                        <td className='col-2'>
                            {!question.text && question.rating ?
                                <Rating access={true} point={question.rating} />
                                : !question.text && !question.rating ?
                                    <Rating access={true} point={question.rating} />
                                    : ''}
                        </td> */}
                        <td className='col-2'></td>
                        <td className='col-2'>
                            <button
                                onClick={() => this.toggleModal('questionDetail', question.id)}
                                className="button p-0 btn-primary mr-1"  >
                                {/* <SVG src={require('../../css/icons/eye-closeup.svg')} style={{ height: '20px', fill: 'white' }} /> */}
                            </button>
                        </td>
                    </tr>
                )
            })
        }
    }
    showAswers = () => {
        let { allAnswers } = this.state;
        return allAnswers.length > 0 && allAnswers.map(answers => {
            return (
                <tr className='row ml-2' style={{ width: '99%' }}>
                    <td className='col-5'>{answers.text}</td>
                    <td className='col-4'>{!answers.text && answers.rating ?
                                <Rating access={true} point={answers.rating} />
                                : !answers.text && !answers.rating ?
                                    <Rating access={true} point={answers.rating} />
                                    : ''}</td>
                    <td className='col-3'>{answers.created_date}</td>
                </tr>
            )
        })
    }
    rederModal = () => {
        switch (this.state.show) {
            case 'detailForm': {
                return (
                    <ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.showModal(true)}
                            </h5>
                            <button type="button" className="close" onClick={this.toggleModalClose} >
                                <span aria-hidden="true">×</span>
                            </button>

                        </div>
                        <div className='detail__review container' >
                            <table className="table ">
                                <thead >
                                    <tr className="table-dark row text-dark">
                                        <th className='col-6' >Câu hỏi</th>
                                        <th className='col-2'>Trung bình</th>
                                        <th className='col-2'>Màu</th>
                                        <th className='col-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showModal(false)}
                                </tbody>

                            </table>
                        </div>
                        <div className="modal-footer">
                            {/* <Panigation totalData={this.state.resultQues} itemPage={this.state.itemPage} setPage={(page) => this.setState({ page })} /> */}
                            <span className='mr-5 font-weight-bold'>Tổng điểm: {this.state.detailResults.percentAnswers && parseFloat(this.state.detailResults.percentAnswers.percent).toFixed()} </span>
                        </div>
                    </ModalForm>
                )
            }

            case 'questionDetail': {
                return (
                    <ModalForm show={this.state.isOpen} size='lg' onClose={this.toggleModalClose}>
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.state.allAnswers[0] && this.state.allAnswers[0].title}
                            </h5>
                            <button type="button" className="close" onClick={this.toggleModalClose} >
                                <span aria-hidden="true">×</span>
                            </button>

                        </div>
                        <div className='detail__review container' >
                            <table className="table ">
                                <thead >
                                    <tr className="table-dark row text-dark">
                                        <th className='col-5'>Nội dung đánh giá</th>
                                        <th className='col-4'>Đánh giá</th>
                                        <th className='col-3'>Ngày tạo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showAswers()}
                                </tbody>

                            </table>
                        </div>
                        {/* <div className="modal-footer"> */}
                            {/* <Panigation totalData={this.state.resultQues} itemPage={this.state.itemPage} setPage={(page) => this.setState({ page })} /> */}
                            {/* <span className='mr-5 font-weight-bold'>Tổng điểm: {this.state.detailResults.percentAnswers && parseFloat(this.state.detailResults.percentAnswers.percent).toFixed()} </span> */}
                        {/* </div> */}
                    </ModalForm>
                )
            }
            default:
                break;
        }
    }
    render() {
        return (
            <div style={{ overflowY: 'hidden ' }} >
                {this.rederModal()}
                <div className="card border-0 body mb-0">
                    <TableHeader getPaging={this.getPaging} />
                    <div className="card-body p-0 container__table container-fluid ">
                        <table className="table mb-0">
                            <thead>
                                <tr className="table-dark row mx-2 text-dark">
                                    <th className='col-3' >Form Review</th>
                                    <th className='col-2'>Công ty</th>
                                    <th className='col-2'>Tổng điểm</th>
                                    <th className='col-1'>Màu</th>
                                    <th className='col-2'>Ngày tạo</th>
                                    <th className='col-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderReview()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className=" card-footer border-0 d-flex p-0 ">
                    <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} />
                </div>

                <ToastContainer />
            </div>
        )
    }
}
