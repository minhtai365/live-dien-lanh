import { connect } from 'react-redux';
import React, { Component } from 'react'
import Slider from 'react-slick';
import { formatMoney, To_slug } from '../../custom/toSlug';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import { toast, ToastContainer } from 'react-toastify';
import './MainHome.css'
import { Link } from 'react-router-dom';
class MainHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateproduct: [],
            topview: []
        }
    }
    async componentDidMount() {
        await this.getHomeProduct();
    }
    getHomeProduct = async (search) => {
        let response = await getProductApi().getHome();
        if (response) {
            this.setState({ cateproduct: response.cateproduct, topview: response.topview })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.success("Thành công")
        }
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            // adaptiveHeight:true,
            className: "slick-st",
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
            ]
        };
        return (
            <div>
                <div className="">
                    <div className="container">
                        <div className="text-center">
                            <span>Xem nhiều</span>
                        </div>
                        <hr className="" />
                    </div>
                </div>
                <div className="container-md">
                    <Slider {...settings}>
                        {this.state.topview.map((x, key) => {
                            return <div key={key} className="col-md-10 col-12 my-2">
                                <div to={"/chi-tiet/" + To_slug(x.name) + "/" + x._id + ".html"}>
                                    <div className="shadow card-slick">
                                        <img className="w-100 p-2" src={x.img[0]} width="200" height="250" alt="" />
                                        <div className="card-body text-center">
                                            <div className="title-cart ">{x.name}</div>
                                            <strike className="card-text text-danger ">{formatMoney(x.price)} VND</strike>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                        }
                    </Slider>
                    {this.state.cateproduct.map((cate, key) => {
                        return <div key={key}>
                            <div className="px-2 mt-4 mb-2">
                                <div className="container bg-light">
                                    <div className="text-center d-flex justify-content-between p-2">
                                        <span>{cate.name}</span>
                                        <Link className="card-text text-danger" to={'/catelogy/' + To_slug(cate.name)} onClick={() => this.props.getCateId(cate._id)}>Xem tất cả</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="container-md">
                                <div className="col-12">
                                    <div className="row">
                                        {
                                            cate.data.map((y, key) =>
                                                <div key={key} className="col-lg-3 col-sm-6 col-6 mt-3">
                                                    <Link to={"/product/" + To_slug(y.name)} onClick={()=>this.props.getProduct(y)}>
                                                        <div className="shadow card-slick">
                                                            <img className="w-100 p-2" src={y.img[0]} width="200" height="250" alt="" />
                                                            {/* </div> */}
                                                            <div className="card-body text-center ">
                                                                <div className="title-cart">{y.name}</div>
                                                                <strike className="card-text text-danger ">{formatMoney(y.price)} VND</strike>
                                                                {/* <p className="card-text text-dark">{formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p> */}
                                                            </div>
                                                        </div>

                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="clearfix" />

                        <Box display="flex" justifyContent="flex-end">
                           <a href={'#'+types._id}> <Pagination id={types._id} /></a>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{page}</Typography>
                        </Box> */}
                        </div>
                    }
                    )}
                </div>

                <ToastContainer />
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCateId: (id) => {
            dispatch({ type: "GET_ID_CATE", id })
        },
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product})
        },
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        slides: state.slides,
        cates: state.cates
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainHome)
