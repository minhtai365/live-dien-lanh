import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import { formatMoney, To_slug } from '../../../Share/toSlug';
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteList from '../../../Share/InfiniteList';
// import Panigation from '../../../Share/Panigation';
import './ViewProduct.css';
import Rating from '../../../Share/Rating';
class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            current_page: 1,
            total: 0,
            // items: Array.from({ length: 5 }),
            hasMore: true
        }
    }
    async fetchMoreData() {
        if (this.state.products.length === this.state.total) {
            this.setState({ hasMore: false, total: 0 });
            // return;
        }
        else {
            let current_page = this.state.current_page + 1;
            let response = await getProductApi().getProductCate({ id: sessionStorage.getItem('cate_id'), rows: 1, current_page });
            if (response) {
                let products = this.state.products.concat(response.data)
                this.setState({ products, current_page, hasMore: true })
                this.props.getProductOfCate(products);
                return toast.success("Thành công", { autoClose: 1000 });
            }
            else {
                return toast.error("Thất bại")
            }
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs

        // setTimeout(() => {
        //     this.setState({
        //         items: this.state.items.concat(Array.from({ length: 5 }))
        //     });
        // }, 500);
    };
    async componentDidMount() {
        // if()
        await this.getPaging(1);
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if ((this.props.cateId && this.props.cateId !== prevProps.cateId)) {
            this.setState({ hasMore: true, })
            await this.getPaging(0);
        }
    }
    getPaging = async (num) => {
        let cateId = this.props.cateId
        if (!this.props.cateId) {
            cateId = sessionStorage.getItem('cate_id');
        }

        let response = await getProductApi().getProductCate({ id: cateId, rows: 1, current_page: 1 });

        if (response) {
            let total = response.total;
            if (num === 0) {
                total = num;
            }
            this.setState({ products: response.data, total, current_page: response.current_page })
            this.props.getProductOfCate(response.data);
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thất bại")
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
                            <InfiniteScroll
                                dataLength={this.state.products.length}
                                next={() => this.fetchMoreData()}
                                hasMore={this.state.hasMore}
                                loader={<h4 style={{ textAlign: "center", color: 'red' }}>Đang tải...</h4>}
                                endMessage={
                                    <p style={{ textAlign: "center", color: 'red' }}>
                                        <b>Bạn đã đến sản phẩm cuối cùng</b>
                                    </p>
                                }
                                style={{ overflow: 'hidden' }}
                            >
                                {this.state.products.map((y, key) =>
                                    <div key={key} className="col-lg-3 col-sm-6 col-12 mt-3 py-2 box-slick">
                                        <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
                                            <div className="shadow card-slick">
                                                <img className="w-100 p-2" src={y.img[0]} width="200" height="250" alt="" />
                                                <div className="card-body text-center ">
                                                    <div className="title-cart">{y.name}</div>
                                                    <strike className="card-text text-danger ">{formatMoney(y.price)} VND</strike>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </InfiniteScroll>
                            {/* <Rating/> */}
                            {/* <InfiniteList state={this.state.products} setState={(setState)=>this.setState({products:setState})} /> */}
                        </div>
                    </div>
                </div>
                {/* <Panigation/> */}
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