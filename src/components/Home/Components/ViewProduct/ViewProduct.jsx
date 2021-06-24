import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import { formatMoney, To_slug } from '../../custom/toSlug';
import './ViewProduct.css'
class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    async componentDidMount() {
        await this.getPaging();
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.cateId && this.props.cateId !== prevProps.cateId) {
            await this.getPaging();
        }
    }
    getPaging = async (search) => {
        let cateId = this.props.cateId
        if (!this.props.cateId) {
            cateId = sessionStorage.getItem('cate_id');
            // this.props.history.push('/home')
        }
        let response = await getProductApi().getProductPaging({ id: cateId });
        if (response) {
            this.setState({ products: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.success("Thành công")
        }
    }
    render() {
        
        return (
            <div>
                <div className="container-md my-2 ">
                    <div className="text-start d-flex bg-light justify-content-between">
                        <div className="best-view">
                            <span style={{ lineHeight: '35px', marginLeft: '10px' }}>{sessionStorage.getItem('cate_name')}</span>
                        </div>
                        <hr className="" />
                    </div>
                </div>
                <div className="container-md">
                    <div className="col-12">
                        <div className="row my-container">
                            {this.state.products.map((y, key) =>
                                <div key={key} className="col-lg-3 col-sm-6 col-12 mt-3 py-2 box-slick">
                                    <Link to={"/product/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
                                        <div className="shadow card-slick">
                                            <img className="w-100 p-2" src={y.img[0]} width="200" height="250" alt="" />
                                            <div className="card-body text-center ">
                                                <div className="title-cart">{y.name}</div>
                                                <strike className="card-text text-danger ">{formatMoney(y.price)} VND</strike>
                                                {/* <p className="card-text text-dark">{formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cateId: state.cateId,
        cate: state.cate
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProduct))