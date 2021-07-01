import React, { Component } from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import '../../css/header.css';
import '../../css/table.css';
import { deleteApi, getCateApi, getProductApi, setProductApi } from '../../custom/repositories/api.repository';
import ModalForm from '../Modal/ModalForm';
import TableHeader from '../Share/TableHeader';
import ViewPost from '../Share/ViewPost';
import Post from './Post';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPage: 10,
            products: [],
            pro: {},
            catelogies: [],
            isSubmit: false,
            isOpen: false,
            file: '',
            previewSource: [],
            isShow: false
        }
    }
    // formatMoney(t) {
    //     return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }
    notify(mess, time) {
        return toast.success(mess, time)
    };
    toggleModal = (pro = null) => {
        if (pro) {
            this.setState({ pro, previewSource: pro.img });
        }
        else {
            this.setState({ pro: {} });
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
            previewSource: []
        });
    };
    async componentDidMount() {

        this.setState({ width: window.innerWidth, height: window.innerHeight });
        await this.getPaging();
        await this.getCatePaging();

    }
    getPaging = async (search) => {
        let response = await getProductApi().getAll();
        if (response) {
            this.setState({ products: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.danger("Thất bại")
        }
    }
    getCatePaging = async (search) => {
        let response = await getCateApi().getPaging({ search });
        if (response) {
            this.setState({ catelogies: response })
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
    handleChange = (e) => {
        const { value, name, required } = e.target;
        //  [name]: value };
        let errorMessage = '';
        if (required) {
            if (value.trim() === '') {
                errorMessage = 'Không được để trống trường dữ liệu này'
            }
        }
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
        let companyErr = { ...this.state.companyErr, [name]: errorMessage }
        this.setState({
            companyErr,
            pro: { ...this.state.pro, [name]: value },
            isSubmit: false
        })
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
        const { pro, companyErr } = this.state;
        let valid = true;
        let errorContent = '';
        if (this.state.isSubmit) {
            return toast.warn("Hệ thống đang xử lý", { autoClose: 5000 });
        }
        else {
            this.setState({ isSubmit: true });
        }
        for (let key in companyErr) {
            if (companyErr[key] !== '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        };
        for (let key in pro) {
            if (pro[key] === '') {
                valid = false;
                errorContent = `<p className="text-danger"> không hợp lệ hoặc không có dữ liệu</p>`
            }
        }
        if (valid) {

            // let obj={};
            // if(this.state.cate){
            // obj=this.state.cate;
            // }
            // obj.name=this.state.name;
            let data = this.state.pro;
            data.files = this.state.previewSource;
            data.post = post;
            let response = await setProductApi().set(data);
            if (response) {
                let isOpen = false;
                this.setState({
                    isOpen,
                    isSubmit: false
                })

                this.getPaging();
                toast(response.mess, { autoClose: 1000 });
            } else {
                toast(response.mess, { autoClose: 5000 });
            }

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
                    Thêm sản phẩm
                </h5>
                <button type="button" className="close ms-auto" onClick={this.toggleModalClose} >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="form-group mb-0 px-5 form__fix " style={{ overflowY: 'auto', height: '80vh', paddingInline: '10px', overflowX: 'hidden' }} >
                <div className="row">
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Tên: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='name' type="text" defaultValue={this.state.pro.name} className="form-control" aria-describedby="helpId" placeholder='Tên Sản phẩm' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.name}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Giá bán: </label>
                        <input onChange={this.handleChange} onBlur={this.handleChange} name='price' type="text" defaultValue={this.state.pro.price} className="form-control" aria-describedby="helpId" placeholder='Giá bán' required />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
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
                        <label> Loại: </label>
                        {/* <input onChange={this.handleChange} name='type' type="text" defaultValue={this.state.pro.} className="form-control" aria-describedby="helpId" placeholder='Loại danh mục' /> */}

                        <select onChange={this.handleChange} name='catelogyid' defaultValue={this.state.pro.catelogyid} className="form-control">
                            {this.state.catelogies.map((cate, index) => {
                                return (
                                    <option key={index} value={cate._id}>{cate.name}</option>
                                )
                            })}
                        </select>
                        {/* <p className='text-danger m-0' >{this.state.companyErr.email}</p> */}
                    </div>
                    <div className="col-md-6 col-12">
                        <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                        <label> Hình: </label>
                        <input onChange={this.handleChangeFile} name="img" accept="image/png, image/jpeg" multiple type="file" placeholder='Hình sản phẩm' className="d-block" />
                        {/* <p className='text-danger m-0' >{this.state.companyErr.hotline}</p> */}
                    </div>
                    <div className="col-12" style={{ textAlign: 'right' }}>
                        {this.state.previewSource.map((file, index) => {
                            return <img key={index} className="boder-upload" onClick={() => this.rmFile(index)} src={file} alt="hinh" />
                        })}
                    </div>
                </div>

                <span className='pr-1' style={{ fontSize: '20px', color: 'red' }}>*</span>
                <label> Bài viết: </label>
                <div >
                    <Post data={this.state.pro.post || ''} submit={(post) => this.setProduct(post)} />
                </div>
                {/* <textarea onChange={this.handleChange} name='detail' type="text" rows="15" defaultValue={this.state.pro.detail} className="form-control" aria-describedby="helpId" placeholder='Chi tiết' /> */}

            </div>
            <div className="modal-footer">
            </div>
        </ModalForm>
        )
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
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
            <div>
                {this.renderModalShow()}
                {this.renderModal()}
                <div className="card border-0 mb-0 body">
                    <TableHeader getPaging={this.getPaging} toggleModal={this.toggleModal} type={'companyAdd'} />
                    <div className="card-body p-0 container__table container-fluid table-responsive">
                        <table className="table mb-0 text-center table-striped">
                            <thead>
                                <tr className="mx-2 text-dark">
                                    <th className="col-3">Tên</th>
                                    <th className="col-2 col-sm-3">Hình</th>
                                    <th className="col-3 col-sm-2">Loại</th>
                                    <th className="col-2">Giá</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((pro, index) => {
                                    return (
                                        <tr className='ml-2 ' key={index} title={`Lượt xem :  ${pro.view} Ngày tạo :  ${pro.createdlc}`}>
                                            <td className="col-3 " style={{ cursor: 'pointer' }} onClick={() => this.setState({ isShow: !this.state.isShow, pro })} title="Xem bài viết">{pro.name}</td>
                                            <td className="col-2 col-sm-3">
                                                {this.state.width <= 576 ?
                                                    <img src={pro.img[0]} className="boder-upload" width="40" height="40" alt="Hình ảnh" />
                                                    : pro.img.map((image, ind) => {
                                                        return <img src={image} key={ind} className="boder-upload" width="40" height="40" alt="Hình ảnh" />
                                                    })}

                                            </td>
                                            <td className="col-3 col-sm-2">{this.state.catelogies.filter(cate =>
                                                cate._id === pro.catelogyid).map((ca, i) => {
                                                    return <div key={i}>{ca.name}</div>
                                                })}
                                            </td>
                                            <td className="col-2">{pro.price}</td>
                                            <td className='col-2 text-right'>
                                                <button onClick={() => this.toggleModal(pro)} title="Sửa" className="button p-0 mr-1 btn-success" >
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
                <div className="card-footer border-0 d-flex p-0">
                    {/* <Panigation totalData={this.state.totalPage} getPageChange={this.getPageChange} /> */}
                </div>
            </div>
        )
    }
}
