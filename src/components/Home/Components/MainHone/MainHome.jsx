import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getProductApi } from '../../../../custom/repositories/api.repository';
import { formatMoney, To_slug } from '../../../Share/toSlug';
import './MainHome.css';
class MainHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateproduct: [],
            topview: []
        }
    }
    async componentDidMount() {
        if (this.props.cateproduct.length === 0 || !this.props.topview.length === 0) {
            await this.getHomeProduct();
        }
        else {
            this.setState({ cateproduct: this.props.cateproduct, topview: this.props.topview });
        }
    }
    getHomeProduct = async (search) => {
        let response = await getProductApi().getHome();
        if (response) {
            this.props.getCateProduct(response.cateproduct);
            this.props.getTopView(response.topview);
            this.setState({ cateproduct: response.cateproduct, topview: response.topview })
        }
        else {
        }
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            // adaptiveHeight:true,
            // className: "slick-st",
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
            ]
        };

        window.addEventListener('scroll', () => {
            if (document.querySelector('.box-title')) {
                let viewTop = window.scrollY;
                let viewBottom = viewTop + window.innerHeight;

                let elmTop = document.querySelector('.box-title').offsetTop;
                let elmBottom = elmTop + document.querySelector('.box-title').height;
                if ((elmTop >= viewTop) && (elmBottom <= viewBottom))
                    document.querySelector('.box-title').classList.add('box-divi-title')
            }
        });
        return (
            <div>
                <div className="container-md my-2 box-title ">
                    <div className="text-start d-flex bg-light justify-content-between">
                        <div className="best-view">
                            <span style={{ lineHeight: '35px', marginLeft: '10px' }}>Xem nhiều</span>
                        </div>
                        <hr className="" />
                    </div>
                </div>
                <div className="container-md  my-2">
                    <div className="container-480">
                        <Slider {...settings}>
                            {this.state.topview.map((x, key) => {
                                return <div key={key} className="col-10 my-2 box-slick">
                                    <Link to={"/chi-tiet/" + To_slug(x.name)} onClick={() => this.props.getProduct(x)}>
                                        <div className="my-shadow mx-md-3 mx-sm-2 mx-1 card-slick">
                                            <div className="box-image">
                                                <img className="p-2" src={x.img[0]} style={{ maxWidth: '100%', maxHeight: "200px" }} alt="" />
                                            </div>
                                            <div className="card-body text-center">
                                                <div className="title-cart text-truncate">{x.name}</div>
                                                <b className="card-text text-danger text-truncate">{formatMoney(x.price)}</b>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            })
                            }
                        </Slider>
                    </div>
                    {this.state.cateproduct.map((cate, key) => {
                        return <div key={key}>
                            <div className=" mt-4 mb-2">
                                <div className="container-md box-title ">
                                    <div className="text-start d-flex bg-light justify-content-between align-items-center" style={{ height: '45px' }}>
                                        <div className="box-title col-6">
                                            <img className="box-title mt-2" src="images/box-title.png" alt="Hinh" />
                                            <span>{cate.name}</span>
                                        </div>
                                        <Link className="card-text justify-content-end d-flex align-items-center text-danger me-2 col-2 view-more"
                                            to={'/san-pham/' + To_slug(cate.name)} onClick={() => this.props.getCateId(cate)}>
                                            <span className="d-sm-block d-none me-2">Xem thêm </span>
                                            <i className="fas fa-caret-right " style={{ fontSize: '25px' }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="container-md">
                                <div className="col-12">
                                    <div className="row">
                                        {
                                            cate.data.map((y, key) =>
                                                <div key={key} className="col-lg-4 col-xl-3 col-sm-6 mycol-12 mt-3 py-2 box-my-card box-slick" >
                                                    <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
                                                        <div className="my-shadow card-slick ">
                                                            <div className="box-image">
                                                                <img className="p-2 image-card" src={y.img[0]} alt="" />
                                                            </div>
                                                            <div className="card-body text-center " style={{ maxHeight: '100px' }}>
                                                                <div className="title-cart text-truncate">{y.name}</div>
                                                                <div className="card-text text-danger text-truncate ">{y.price}</div>
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
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCateId: (cate) => {
            dispatch({ type: "GET_ID_CATE", id: cate._id, name: cate.name })
        },
        getProduct: (product) => {
            dispatch({ type: "GET_DATA_PRODUCT", product })
        },
        getCateProduct: (cateproduct) => {
            dispatch({ type: 'GET_DATA_CATEPRODUCT', cateproduct })
        },
        getTopView: (topview) => {
            dispatch({ type: 'GET_DATA_TOPVIEW', topview })
        },
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        slides: state.slides,
        cates: state.cates,
        cateproduct: state.cateproduct,
        topview: state.topview
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainHome)
