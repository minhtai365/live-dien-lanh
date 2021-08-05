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
            isShowEditForm: false,
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
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.danger("Thất bại")
        }
    }
    getCatePaging = async (search) => {
        let response = await getCateApi().getPaging({ search });
        if (response) {
            this.setState({ catelogies: response, catelogyid: response[0]._id })
        }
        else {
            return toast.danger("Thất bại")
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
        //         errorMessage = 'Không được để trống trường dữ liệu này'
        //     }
        // }
        // if (name === 'email') {
        //     let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        //     if (!regex.test(value)) {
        //         errorMessage = 'Không đúng định dạng';
        //     }
        // }
        // if (name === 'hotline') {
        //     let regex = /^[0-9\-\+]{9,15}$/
        //     if (!regex.test(value)) {
        //         errorMessage = 'Không đúng định dạng';
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
        //     return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        // }
        // else {
        //     this.setState({ isSubmit: true });
        // }
        // for (let key in companyErr) {
        //     if (companyErr[key] !== '') {
        //         valid = false;
        //         errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
        //     }
        // };
        // for (let key in pro) {
        //     if (pro[key] === '') {
        //         valid = false;
        //         errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
        //     }
        // }
        if (valid) {
            let data = this.state.pro;
            data.files = this.state.previewSource;
            data.post = this.state.post;
            data.catelogyid = this.state.catelogyid;
            let response = await setProductApi().set(data);
            if (response) {
                let isShowEditForm = false;
                this.setState({
                    isShowEditForm,
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
            //     confirmButtonText: 'Trở về'
            // })
            return;
        }
    }
    delete = async (pro) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
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
                    {this.state.isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="form-group mb-0 px-5 form__fix " style={{ overflowY: 'auto', height: '75vh', paddingInline: '10px', overflowX: 'hidden' }} >
                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Tên: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.pro ? this.state.pro.name : ''} className="form-control" aria-describedby="helpId" placeholder='Tên Sản phẩm' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    {/* <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá bán: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro ? this.state.pro.price : ''} className="form-control" aria-describedby="helpId" placeholder='Giá bán' required />
                    </div> */}
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Loại: </label>
                        {/* <input onChange={this.handleChange} name='type' type="text" defaultValue={this.state.pro.} className="form-control" aria-describedby="helpId" placeholder='Loại danh mục' /> */}
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
                        <label> Hãng: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='producer' type="text" defaultValue={this.state.pro.producer} className="form-control" aria-describedby="helpId" placeholder='Hãng' />
                        <p className='text-danger m-0' >{this.state.companyErr.name}</p>
                    </div>
                    <div className="col-md-6 col-12">
                        <label> Giá gốc: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro.price} className="form-control" aria-describedby="helpId" placeholder='Giá gốc' />
                        <p className='text-danger m-0' >{this.state.companyErr.email}</p>
                    </div>
                </div> */}

                <div className="row">

                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Hình: </label>
                        <input onChange={this.handleChangeFile} name="img" accept="image/png, image/jpeg" multiple type="file" placeholder='Hình sản phẩm' className="d-block" />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                    <div className="col-12" style={{ textAlign: 'right' }}>
                        {this.state.previewSource && this.state.previewSource.map((file, index) => {
                            return <img key={index} className="boder-upload" onClick={() => this.rmFile(index)} src={file} alt="hinh" />
                        })}
                    </div>
                </div>

                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Bài viết: </label>
                <div >
                    <Post data={(this.state.pro && this.state.pro.post) || ''} getDataEditor={(post) => this.setState({ post: post })} />
                </div>
                {/* <textarea onChange={this.handleChange} name='detail' type="text" rows="15" defaultValue={this.state.pro.detail} className="form-control" aria-describedby="helpId" placeholder='Chi tiết' /> */}

            </div>
            <div className="modal-footer">
                <button onClick={() => this.setProduct()} type='submit' className="btn btn-primary">
                    {this.state.isEdit ? 'Sửa' : 'Thêm'}
                </button>
            </div>
        </ModalForm>
        )
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    statusFormEdit = () => {
        if (this.state.isShowEditForm) {
            document.querySelector('.edit-form').classList.add("edit-form-show");
            document.querySelector('.body-product').style.right = '100%';
        }
        else {
            if (document.querySelector('.edit-form-show')&&document.querySelector('.body-product')) {
                document.querySelector('.edit-form').classList.remove("edit-form-show");
                document.querySelector('.body-product').style.right = '0';
            }

        }
    }
    toggleEditForm = (pro = null) => {

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
        let isShowEditForm = true;
        this.setState({
            isShowEditForm
        });
    };
    toggleEditClose = () => {
        let isShowEditForm = false;
        this.setState({
            isShowEditForm,
            previewSource: [],
            pro: null,
            post: ''
        });
    }
    formEditProduct = () => {
        return (
            <div className="edit-form">
                <div className="modal-header ">
                    <h5 className="modal-title">
                        {this.state.isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                    </h5>
                    <button type="button" className="close ms-auto" onClick={this.toggleEditClose} >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="form-group mb-0 px-5 form__fix " style={{ overflowY: 'auto', height: '75vh', paddingInline: '10px', overflowX: 'hidden' }} >
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                            <label> Tên: </label>
                            <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.pro ? this.state.pro.name : ''} className="form-control" aria-describedby="helpId" placeholder='Tên Sản phẩm' required />
                            {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                        </div>
                        {/* <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá bán: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro ? this.state.pro.price : ''} className="form-control" aria-describedby="helpId" placeholder='Giá bán' required />
                    </div> */}
                        <div className="col-md-6 col-12">
                            <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                            <label> Loại: </label>
                            {/* <input onChange={this.handleChange} name='type' type="text" defaultValue={this.state.pro.} className="form-control" aria-describedby="helpId" placeholder='Loại danh mục' /> */}
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
                        <label> Hãng: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='producer' type="text" defaultValue={this.state.pro.producer} className="form-control" aria-describedby="helpId" placeholder='Hãng' />
                        <p className='text-danger m-0' >{this.state.companyErr.name}</p>
                    </div>
                    <div className="col-md-6 col-12">
                        <label> Giá gốc: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro.price} className="form-control" aria-describedby="helpId" placeholder='Giá gốc' />
                        <p className='text-danger m-0' >{this.state.companyErr.email}</p>
                    </div>
                </div> */}

                    <div className="row">

                        <div className="col-md-6 col-12">
                            <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                            <label> Hình: </label>
                            <input onChange={this.handleChangeFile} name="img" accept="image/png, image/jpeg" multiple type="file" placeholder='Hình sản phẩm' className="d-block" />
                            {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                        </div>
                        <div className="col-12" style={{ textAlign: 'right' }}>
                            {this.state.previewSource && this.state.previewSource.map((file, index) => {
                                return <img key={index} className="boder-upload" onClick={() => this.rmFile(index)} src={file} alt="hinh" />
                            })}
                        </div>
                    </div>

                    <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                    <label> Bài viết: </label>
                    <div >
                        {this.state.isShowEditForm &&
                            <Post data={this.state.pro ? this.state.pro.post : ''} getDataEditor={(post) => this.setState({ post: post })} />
                        }
                    </div>
                    {/* <textarea onChange={this.handleChange} name='detail' type="text" rows="15" defaultValue={this.state.pro.detail} className="form-control" aria-describedby="helpId" placeholder='Chi tiết' /> */}

                </div>
                <div className="modal-footer">
                    <button onClick={() => this.setProduct()} type='submit' className="btn btn-primary">
                        {this.state.isEdit ? 'Sửa' : 'Thêm'}
                    </button>
                </div>
            </div>
        )
    }
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
                    <span aria-hidden="true">×</span>
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
            <div className="con-page">
                {this.renderModalShow()}
                {/* {this.renderModal()} */}
                {this.statusFormEdit()}
                {this.formEditProduct()}

                <div className="card border-0 mb-0 body body-product" >
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleEditForm} getDataSearch={(search) => this.changeSearch(search)} type={'product'} />
                    <div className="card-body p-0 container__table container-fluid table-responsive">
                        <table className="table mb-0 text-center table-striped">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className="col-3">Tên</th>
                                    <th className="col-2 col-sm-3">Hình</th>
                                    <th className="col-3 col-sm-2">Loại</th>
                                    <th className="col-2">Lượt xem</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products && this.state.products.map((pro, index) => {
                                    return (
                                        <tr className='ml-2 ' key={index} title={`Lượt xem :  ${pro.view} Ngày tạo :  ${pro.createdlc}`}>
                                            <td className="col-3 " style={{ cursor: 'pointer' }} onClick={() => this.setState({ isShow: !this.state.isShow, pro })} title="Xem bài viết">{pro.name}</td>
                                            <td className="col-2 col-sm-3">
                                                {this.state.width <= 576 ?
                                                    <img src={pro.img ? pro.img[0] : ''} className="boder-upload" width="40" height="40" alt="Hình ảnh" />
                                                    : pro.img && pro.img.map((image, ind) => {
                                                        return <img src={image} key={ind} className="boder-upload" width="40" height="40" alt="Hình ảnh" />
                                                    })}

                                            </td>
                                            <td className="col-3 col-sm-2">{this.state.catelogies.filter(cate =>
                                                cate._id === pro.catelogyid).map((ca, i) => {
                                                    return <div key={i}>{ca.name}</div>
                                                })}
                                            </td>
                                            <td className="col-2">{pro.view}</td>
                                            <td className='col-2 text-right'>
                                                <button onClick={() => this.toggleEditForm(pro)} title="Sửa" className="button p-0 mr-1 btn-success" >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => { this.delete(pro) }} title="Xóa" className="button btn-danger p-0" >
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
                        <label className="mx-2 my-0 d-none d-sm-inline-block"> Lọc theo : -</label>
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
                            <option value="">Tất cả</option>
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
