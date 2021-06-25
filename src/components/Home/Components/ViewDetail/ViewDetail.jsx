import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getInfoApi, getProductApi } from '../../../../custom/repositories/api.repository';
import ViewPost from '../../../Share/ViewPost';
import { formatMoney } from '../../custom/toSlug';
import ReactHtmlParser from 'react-html-parser';
function mapStateToProps(state) {
    return {
        product: state.product,
        info: state.info
    };
}

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
                // return toast.success("Thành công", { autoClose: 1000 });
            }
            else {
                return toast.error("Thất bại")
            }
        }
        if (this.props.product === null) {
            let response = await getProductApi().getOne('detail/' + sessionStorage.getItem('pro_id'));
            if (response) {
                this.setState({ product: response[0] })
                // return toast.success("Thành công", { autoClose: 1000 });
            }
            else {
                return toast.error("Thất bại")
            }
        }

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
                            <img src={product && product.img[this.state.indexImg]} width="350" height="300" />
                            <div className="py-3 text-center ">
                                {product && product.img.map((im, i) =>
                                    <div className=" mx-lg-3 mx-md-2 mx-3 d-inline" key={i}>
                                        <img onClick={() => this.setState({ indexImg: i })} src={im} width="60" height="50" />
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
                    <ViewPost data={product.post} />
                    {/* <div className="container border p-4">
                        {ReactHtmlParser(product.post)}
                    </div> */}
                </div>
                <div className="row">
                    <h3>Sản phẩm tương tư</h3>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ViewDetail);