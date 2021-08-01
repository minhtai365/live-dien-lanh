import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInfoApi, getProductApi } from '../../../../custom/repositories/api.repository';
import { formatMoney, To_slug } from '../../../Share/toSlug';

class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexImg: 0,
            product: null
        }
    }
    async componentDidMount() {
        if (!this.props.info) {
            let response = await getInfoApi().getPaging();
            if (response) {
                this.setState({ info: response[0] })
            }
            else {
                return toast.error("Thất bại")
            }
        }
        if (this.props.product === null) {
            let response = await getProductApi().getOne('detail/' + sessionStorage.getItem('pro_id'));
            if (response) {
                this.setState({ product: response })
            }
            else {
                return toast.error("Thất bại")
            }
        } else {
            await getProductApi().getOne('viewitem/' + sessionStorage.getItem('pro_id'));

        }
        // if (this.props.productOfCate.length === 0) {
        let product = this.state.product;
        if (this.props.product) {
            product = this.props.product;
        }
        let response = await getProductApi().getProductCate({ id: product.catelogyid, rows: 2 });
        if (response) {
            this.props.getProductOfCate(response.data);
        }
        else {
            return toast.error("Thất bại")
        }
        // }
    }
    render() {
        let product = this.state.product;
        if (this.props.product) {
            product = this.props.product;
        }
        let { info } = this.props
        if (this.state.info) {
            info = this.state.info
        }
        return (
            product !== null &&
            <div className="container-md">
                <div className="row my-3">
                    <h4 className="border-bottom py-3">Chi tiết sản phẩm</h4>
                    <div className="col-md-6 col-12 text-center ">
                        <div>
                            <div style={{height:"150px"}}>
                                <img className="image-detail" src={product && product.img[this.state.indexImg]} alt="Hình" />

                            </div>
                            <div className="py-3 text-center ">
                                {product && product.img.map((im, i) =>
                                    <div className=" mx-lg-3 mx-md-2 mx-3 d-inline" key={i}>
                                        <img onClick={() => this.setState({ indexImg: i })} src={im} className="sub-image" alt="Hình" />
                                    </div>)}
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 col-12 ">
                        <h3 className="border-bottom py-2" >{product.name}</h3>
                        <div className="text-danger border-bottom py-2">Giá : {formatMoney(product.price)} VND</div>
                        <div className="border-bottom py-2">
                            <h5 >Chính sách vận chuyển</h5>
                            <div>{info.shippolicy}</div>
                        </div>
                        <div className="border-bottom py-2">
                            <h5 >Chính sách bảo hành</h5>
                            <div>{info.warrantypolicy}</div>
                        </div>
                        <div className="border-bottom py-2">
                            <h5 >Cam kết chất lượng</h5>
                            <div>{info.paypolicy}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Mô tả</h3>
                    <div>
                        <div className="container border p-4">
                            <div>
                                {ReactHtmlParser(product.post)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Sản phẩm tương tự</h3>
                    <div className="row my-container">
                        {this.props.productOfCate.map((y, key) =>
                            <div key={key} className="col-lg-3 col-sm-6 mycol-12 mt-3 py-2 box-my-card box-slick">
                                <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
                                    <div className="my-shadow card-slick ">
                                        <div className="box-image">
                                            <img className="p-2 image-card" src={y.img[0]} alt="" />
                                        </div>
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
        );
    }
}
function mapStateToProps(state) {
    return {
        product: state.product,
        info: state.info,
        productOfCate: state.productOfCate
    };
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
export default connect(
    mapStateToProps, mapDispatchToProps
)(ViewDetail);