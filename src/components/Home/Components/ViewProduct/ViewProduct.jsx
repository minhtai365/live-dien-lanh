import React, { Component } from 'react';
// import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import Pagination from '@material-ui/lab/Pagination';
import { To_slug } from '../../../Share/toSlug';
import './ViewProduct.css';
class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            current_page: 1,
            rows: 5,
            total: 1,
            hasMore: true
        }
    }
    async fetchMoreData() {
        if (this.state.products.length === this.state.total) {
            this.setState({ hasMore: false, });
        }
        else {
            let current_page = this.state.current_page + 1;
            let response = await getProductApi().getProductCate({ id: sessionStorage.getItem('cate_id'), rows: 4, current_page });
            if (response) {
                let products = this.state.products.concat(response.data)
                this.setState({ products, current_page, hasMore: true })
                this.props.getProductOfCate(products);
            }
            else {
                return toast.error("Thất bại")
            }
        }
    };
    async componentDidMount() {
        await this.getPaging();
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if ((this.props.cateId && this.props.cateId !== prevProps.cateId)) {
            this.setState({ hasMore: true, })
            await this.getPaging();
        }
    }
    getPaging = async (cateId = this.props.cateId, rows = this.state.rows, current_page = 1) => {
        let id = cateId
        if (!cateId) {
            id = sessionStorage.getItem('cate_id');
        }

        let response = await getProductApi().getProductCate({ id, rows, current_page });

        if (response) {
            let total = response.total;
            this.setState({ products: response.data, total, current_page: response.current_page })
            this.props.getProductOfCate(response.data);
        }
        else {
            return toast.error("Thất bại")
        }
    }
    changePage = async (e, page) => {
        this.setState({ current_page: page });
        window.scrollTo(0,0);
        await this.getPaging(this.props.cateId, this.state.rows, page);
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
                    {/* <div className="col-12"> */}
                    <div className="row my-container">
                        {/* <InfiniteScroll
                            dataLength={this.state.products.length}
                            next={() => this.fetchMoreData()}
                            hasMore={this.state.hasMore}
                            loader={<h4 style={{ textAlign: "center", color: 'red' }}>Đang tải...</h4>}
                            endMessage={
                                <p style={{ textAlign: "center", color: 'red' }}>
                                    <b>Bạn đã đến sản phẩm cuối cùng</b>
                                </p>
                            }
                            InfiniteScroll={0.1}
                            style={{
                                overflow: 'hidden', display: 'flex', flexWrap: 'wrap'
                            }}
                        > */}
                        {
                            this.state.products.map((y, key) =>
                                // box-slick 
                                <div key={key} className="col-lg-3 col-sm-6 mycol-12 mt-3 px-1 py-2 box-my-card box-slick ">
                                    <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
                                        <div className="my-shadow card-slick">
                                            <div className="box-image">
                                                <img className="p-2 image-card" src={y.img[0]} alt="" />
                                            </div>
                                            <div className="card-body text-center ">
                                                <div className="title-cart">{y.name}</div>
                                                <b className="card-text text-danger">{y.price}</b>
                                                {/* <strike className="card-text text-danger ">{formatMoney(y.price)} VND</strike> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
                {/* </div> */}
                {/* {this.state.products.length === this.state.total
                    &&
                    <div>
                        <p style={{ textAlign: "center", color: 'red', margin: '0' }}>
                            <b>Bạn đã đến sản phẩm cuối cùng</b>
                        </p>
                    </div>
                } */}
                <div className="d-flex justify-content-end mb-2">
                    <Pagination count={Math.ceil(this.state.total / this.state.rows)} page={this.state.current_page} onChange={this.changePage} color="secondary" />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cateId: state.cateId,
        cate: state.cate,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product })
        },
        getProductOfCate: (productOfCate) => {
            dispatch({ type: "GET_DATA_PRODUCT_OF_CATE", productOfCate })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProduct))