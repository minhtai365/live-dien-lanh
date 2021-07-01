import React, { Component } from 'react'
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
            products: []
        }
    }
    async componentDidMount() {
        if (this.props.productsearch.length === 0) {
            await this.getPaging(this.props.search);
        }
    }
    getPaging = async (search) => {
        let response = await getProductApi().getProductPaging({ search });
        if (response) {
            this.props.getProductOfSearch(response);
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
                            <span style={{ lineHeight: '35px', marginLeft: '10px' }}>Kết quả cho "{this.props.search}"</span>
                        </div>
                        <hr className="" />
                    </div>
                </div>
                <div className="container-md">
                    <div className="col-12">
                        <div className="row my-container">
                            {this.props.productsearch.map((y, key) =>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    search: state.search,
    productsearch: state.productsearch

})
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataSearch: (search) => {
            dispatch({ type: "GET_DATA_SEARCH", search })
        },
        getProductOfSearch: (productsearch) => {
            console.log(productsearch);
            dispatch({ type: "GET_PRODUCT_SEARCH", productsearch })
        },
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResutlSearch))
