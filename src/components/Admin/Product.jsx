import Pagination from '@material-ui/lab/Pagination';
import React, { Component } from 'react';
import { toast } from "react-toastify";
import '../../css/header.css';
import '../../css/table.css';
import { deleteApi, getCateApi, getProductApi, setProductApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import ViewPost from '../Share/ViewPost';
import Post from './Post';
import TableHeader from './TableHeader';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            total: 1,
            rows: 10,
            search: '',
            filterBy: '',
            products: [],
            pro: null,
            catelogyid: '',
            catelogies: [],
            isSubmit: false,
            isOpen: false,
            file: '',
            previewSource: [],
            isShow: false,
            post: ''
        }
    }
    // formatMoney(t) {
    //     return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }
    notify(mess, time) {
        return toast.success(mess, time)
    };
    toggleModal = (pro = null) => {
        let previewSource;
        if (pro) {
            previewSource = pro.img;
        }
        if (pro && !pro.img) {
            previewSource = [];
        }
        if (pro) {
            this.setState({ pro, previewSource, isEdit: true, catelogyid: pro.catelogyid });
        }
        else {
            this.setState({ pro: null, isEdit: false, previewSource: [], catelogyid: this.state.catelogies[0] });
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
            previewSource: [],
            pro: null,
            post: ''
        });
    };
    async componentDidMount() {

        this.setState({ width: window.innerWidth, height: window.innerHeight });
        await this.getPaging();
        await this.getCatePaging();

    }
    getPaging = async (search, rows = this.state.rows, current_page = 1, id = '') => {
        let response = await getProductApi().getProductPaging({ search, rows, current_page, id });
        if (response) {
            this.setState({ products: response.data, total: response.total, page: response.current_page })
            return toast.success("Th??nh c??ng", { autoClose: 1000 });
        }
        else {
            return toast.danger("Th???t b???i")
        }
    }
    getCatePaging = async (search) => {
        let response = await getCateApi().getPaging({ search });
        if (response) {
            this.setState({ catelogies: response, catelogyid: response[0]._id })
        }
        else {
            return toast.danger("Th???t b???i")
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
    changePage = async (e, page) => {
        this.setState({ page });
        await this.getPaging(this.state.search, this.state.rows, page);
    }
    changeSearch = async (search) => {
        this.setState({ search });
        await this.getPaging(search, this.state.rows, 1, this.state.filterBy);
    }
    changeRow = async (e) => {
        this.setState({ rows: e.target.value });
        await this.getPaging(this.state.search, e.target.value);
    }
    changeCate = async (e) => {
        this.setState({ filterBy: e.target.value });
        await this.getPaging(this.state.search, this.state.rows, 1, e.target.value);
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        // if (required) {
        //     if (value.trim() === '') {
        //         errorMessage = 'Kh??ng ???????c ????? tr???ng tr?????ng d??? li???u n??y'
        //     }
        // }
        // if (name === 'email') {
        //     let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        //     if (!regex.test(value)) {
        //         errorMessage = 'Kh??ng ????ng ?????nh d???ng';
        //     }
        // }
        // if (name === 'hotline') {
        //     let regex = /^[0-9\-\+]{9,15}$/
        //     if (!regex.test(value)) {
        //         errorMessage = 'Kh??ng ????ng ?????nh d???ng';
        //     }
        // }
        if (name === 'catelogyid') {
            this.setState({ catelogyid: value });
        }
        else {
            this.setState({
                pro: { ...this.state.pro, [name]: value },
                isSubmit: false
            })
        }

    }
    handleChangeFile = async (e) => {
        let { files } = e.target;
        const file = files[0];
        this.setState({
            file: file
        })
        let arrFile = this.state.previewSource;
        let reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onloadend = async () => {
            arrFile.push(reader.result)
            await this.setState({ previewSource: arrFile });
        }
    }
    rmFile = (index) => {
        let rmPre = this.state.previewSource;
        rmPre.splice(index, 1);
        this.setState({ previewSource: rmPre });
    }
    setProduct = async (post) => {
        // const { pro } = this.state;
        let valid = true;
        // let errorContent = '';
        // if (this.state.isSubmit) {
        //     return toast.warn("H??? th???ng ??ang x??? l??", { autoClose: 5000 });
        // }
        // else {
        //     this.setState({ isSubmit: true });
        // }
        // for (let key in companyErr) {
        //     if (companyErr[key] !== '') {
        //         valid = false;
        //         errorContent = `<p className="text-danger"> kh??ng h???p l??? ho???c kh??ng c?? d??? li???u</p>`
        //     }
        // };
        // for (let key in pro) {
        //     if (pro[key] === '') {
        //         valid = false;
        //         errorContent = `<p className="text-danger"> kh??ng h???p l??? ho???c kh??ng c?? d??? li???u</p>`
        //     }
        // }
        if (valid) {
            let data = this.state.pro;
            data.files = this.state.previewSource;
            data.post = this.state.post;
            data.catelogyid = this.state.catelogyid;
            let response = await setProductApi().set(data);
            if (response) {
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false
                })
                this.getPaging();
                // toast(response.mess, { autoClose: 1000 });
            } else {
                toast(response.mess, { autoClose: 5000 });
            }
        } else {
            // Swal.fire({
            //     icon: 'error',
            //     html: errorContent,
            //     confirmButtonText: 'Tr??? v???'
            // })
            return;
        }
    }
    delete = async (pro) => {
        if (window.confirm("B???n c?? ch???c mu???n x??a?")) {
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
                    {this.state.isEdit ? 'S???a s???n ph???m' : 'Th??m s???n ph???m'}
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">??</span>
                </button>
            </div>
            <div className="form-group mb-0 px-5 form__fix " style={{ overflowY: 'auto', height: '75vh', paddingInline: '10px', overflowX: 'hidden' }} >
                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> T??n: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.pro ? this.state.pro.name : ''} className="form-control" aria-describedby="helpId" placeholder='T??n S???n ph???m' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    {/* <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Gi?? b??n: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro ? this.state.pro.price : ''} className="form-control" aria-describedby="helpId" placeholder='Gi?? b??n' required />
                    </div> */}
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Lo???i: </label>
                        {/* <input onChange={this.handleChange} name='type' type="text" defaultValue={this.state.pro.} className="form-control" aria-describedby="helpId" placeholder='Lo???i danh m???c' /> */}
                        <select onChange={this.handleChange} name='catelogyid' value={this.state.catelogyid} className="my-select">
                            {this.state.catelogies.map((cate, index) => {
                                return (
                                    <option key={index} value={cate._id}>{cate.name}</option>
                                )
                            })}
                        </select>
                        {/* <p className='text-danger m-0' >{this.state.companyErr.email}</p> */}
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-md-6 col-12">
                        <label> H??ng: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='producer' type="text" defaultValue={this.state.pro.producer} className="form-control" aria-describedby="helpId" placeholder='H??ng' />
                        <p className='text-danger m-0' >{this.state.companyErr.name}</p>
                    </div>
                    <div className="col-md-6 col-12">
                        <label> Gi?? g???c: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro.price} className="form-control" aria-describedby="helpId" placeholder='Gi?? g???c' />
                        <p className='text-danger m-0' >{this.state.companyErr.email}</p>
                    </div>
                </div> */}

                <div className="row">

                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> H??nh: </label>
                        <input onChange={this.handleChangeFile} name="img" accept="image/png, image/jpeg" multiple type="file" placeholder='H??nh s???n ph???m' className="d-block" />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                    <div className="col-12" style={{ textAlign: 'right' }}>
                        {this.state.previewSource && this.state.previewSource.map((file, index) => {
                            return <img key={index} className="boder-upload" onClick={() => this.rmFile(index)} src={file} alt="hinh" />
                        })}
                    </div>
                </div>

                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> B??i vi???t: </label>
                <div >
                    <Post data={(this.state.pro && this.state.pro.post) || ''} getDataEditor={(post) => this.setState({ post: post })} />
                </div>
                {/* <textarea onChange={this.handleChange} name='detail' type="text" rows="15" defaultValue={this.state.pro.detail} className="form-control" aria-describedby="helpId" placeholder='Chi ti???t' /> */}

            </div>
            <div className="modal-footer">
                <button onClick={() => this.setProduct()} type='submit' className="btn btn-primary">
                    {this.state.isEdit ? 'S???a' : 'Th??m'}
                </button>
            </div>
        </ModalForm>
        )
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.updateDimensions);
    // }

    // }
    // window.onresize=()=> {
    //     console.log(window.innerHeight);
    //     console.log(window.innerWidth);
    //     if (window.innerWidth <= 680) {
    //         this.setState({ hide: true })
    //     }
    //     else {
    //         this.setState({ hide: false })
    //     }
    // }

    renderModalShow = () => {
        let data = {};
        if (this.state.pro) {
            data.name = this.state.pro.name;
            data.post = this.state.pro.post;
        }
        return (<ModalForm show={this.state.isShow} size='lg' className="px-3" onClose={() => this.setState({ isShow: false })}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {data.name}
                </h5>
                <button type="button" className="close ms-auto" onClick={() => this.setState({ isShow: false })} >
                    <span aria-hidden="true">??</span>
                </button>
            </div>
            <div style={{ overflowY: 'auto', height: '80vh', paddingInline: '20px', overflowX: 'hidden' }} >
                <ViewPost data={data.post} />
            </div>

            <div className="modal-footer">
            </div>
        </ModalForm>
        )
    }
    render() {
        window.addEventListener('resize', this.updateDimensions);
        return (
            <div >
                {this.renderModalShow()}
                {this.renderModal()}
                <div className="card border-0 mb-0 body" >
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} getDataSearch={(search) => this.changeSearch(search)} type={'product'} />
                    <div className="card-body p-0 container__table container-fluid table-responsive">
                        <table className="table mb-0 text-center table-striped">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className="col-3">T??n</th>
                                    <th className="col-2 col-sm-3">H??nh</th>
                                    <th className="col-3 col-sm-2">Lo???i</th>
                                    <th className="col-2">L?????t xem</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products && this.state.products.map((pro, index) => {
                                    return (
                                        <tr className='ml-2 ' key={index} title={`L?????t xem :  ${pro.view} Ng??y t???o :  ${pro.createdlc}`}>
                                            <td className="col-3 " style={{ cursor: 'pointer' }} onClick={() => this.setState({ isShow: !this.state.isShow, pro })} title="Xem b??i vi???t">{pro.name}</td>
                                            <td className="col-2 col-sm-3">
                                                {this.state.width <= 576 ?
                                                    <img src={pro.img ? pro.img[0] : ''} className="boder-upload" width="40" height="40" alt="H??nh ???nh" />
                                                    : pro.img && pro.img.map((image, ind) => {
                                                        return <img src={image} key={ind} className="boder-upload" width="40" height="40" alt="H??nh ???nh" />
                                                    })}

                                            </td>
                                            <td className="col-3 col-sm-2">{this.state.catelogies.filter(cate =>
                                                cate._id === pro.catelogyid).map((ca, i) => {
                                                    return <div key={i}>{ca.name}</div>
                                                })}
                                            </td>
                                            <td className="col-2">{pro.view}</td>
                                            <td className='col-2 text-right'>
                                                <button onClick={() => this.toggleModal(pro)} title="S???a" className="button p-0 mr-1 btn-success" >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => { this.delete(pro) }} title="X??a" className="button btn-danger p-0" >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className=" border-0 d-flex justify-content-between align-items-center p-1">
                    {/* <BasicPagination /> */}
                    <div >
                        <label className="mx-2 my-0 d-none d-sm-inline-block"> L???c theo : -</label>
                        <select onChange={this.changeCate} style={{
                            // width: '40px',
                            color: '#fff',
                            height: '32px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#198754',
                            outline: 'none',
                            paddingInline: '10px'
                        }}>
                            <option value="">T???t c???</option>
                            {this.state.catelogies.map((cate, i) => {
                                return <option key={i} value={cate._id}>{cate.name}</option>
                            })}

                        </select>
                    </div>


                    <div className="d-flex justify-content-end align-items-center ">
                        <select onChange={this.changeRow} style={{
                            width: '40px',
                            color: '#fff',
                            height: '30px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#f50057',
                            outline: 'none',
                        }}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <Pagination count={Math.ceil(this.state.total / this.state.rows)} page={this.state.page} onChange={this.changePage} color="secondary" />

                    </div>
                </div>
            </div>
        )
    }
}
