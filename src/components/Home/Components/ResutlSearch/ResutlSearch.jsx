import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductApi } from '../../../../custom/repositories/api.repository'
import { formatMoney, To_slug } from '../../../Share/toSlug'

class ResutlSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            current_page: 1,
            total: 0,
            hasMore: true

        }
    }
    fetchMoreData = async () => {
        if (this.state.products.length >= this.state.total) {
            this.setState({ hasMore: false });
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        let current_page = this.state.current_page + 1;
        let response = await getProductApi().getProductPaging({ search: this.props.search, rows: 1, current_page });
        if (response) {
            let products = this.state.products.concat(response.data)
            this.setState({ products, current_page })
            // this.props.getProductOfCate(products);
            // return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thất bại")
        }
    };
    async componentDidMount() {
        // if (this.props.productsearch.length === 0) {
        await this.getPaging(this.props.search);
        // }
        if (this.props.search === '') {
            this.props.history.push('/trang-chu')
        }
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.search !== prevProps.search) {
            window.scrollTo(0, 0);
            await this.getPaging(this.props.search);
        }
    }
    getPaging = async (search) => {
        let response = await getProductApi().getProductPaging({ search, rows: 1, current_page: 1 });
        if (response) {
            this.props.getProductOfSearch(response);
            this.setState({ products: response.data, current_page: response.current_page, total: response.total, hasMore: true })
            // return toast.success("Thành công", { autoClose: 1000 });
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
                            <span style={{ lineHeight: '35px', marginLeft: '10px' }}>Kết quả cho "{this.props.search}"</span>
                        </div>
                        <hr className="" />
                    </div>
                </div>
                <div className="container-md">
                    <div className="col-12">
                        <div id="scrollableDiv" className="row my-container">
                                <InfiniteScroll
                                    dataLength={this.state.products.length}
                                    next={this.fetchMoreData}
                                    hasMore={this.state.hasMore}
                                    loader={<h4 style={{ textAlign: "center", color: 'red' }}>Đang tải...</h4>}
                                    // height={200}
                                    endMessage={
                                        <p style={{ textAlign: "center", color: 'red' }}>
                                            <b>Bạn đã đến sản phẩm cuối cùng</b>
                                        </p>
                                    }
                                    style={{ overflow:'hidden' }} //To put endMessage and loader to the top.
                                    // scrollableTarget="scrollableDiv"
                                >
                                    {this.state.products.map((y, key) =>
                                        <div key={key} className="col-lg-3 col-sm-6 col-12 mt-3 py-2 box-slick">
                                            <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
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
                                </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    search: state.search,
    // productsearch: state.productsearch

})
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataSearch: (search) => {
            dispatch({ type: "GET_DATA_SEARCH", search })
        },
        getProductOfSearch: (productsearch) => {
            dispatch({ type: "GET_PRODUCT_SEARCH", productsearch })
        },
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResutlSearch))
