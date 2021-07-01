import React, { Component, Suspense, lazy } from 'react';
import './Header.css';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import Headroom from 'react-headroom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Form,
    Input,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
} from "reactstrap";
import { getCateApi, getProductApi, getServiceApi } from '../../../../custom/repositories/api.repository';
import { toast } from 'react-toastify';
import { To_slug } from '../../../Share/toSlug';
import { connect } from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            service: [],
            cate: [],
            dichvu: false,
            // search:''
        }
        // this.handelChangeValue = this.handelChangeValue.bind(this);
    }
    async componentDidMount() {
        // await this.getHomeProduct();
        await this.getPagingCate();
    }
   
    getHomeProduct = async (search) => {
        let response = await getProductApi().getHome();
        if (response) {
            this.props.getCateProduct(response.cateproduct);
            this.props.getTopView(response.topview);
            this.setState({ cateproduct: response.cateproduct, topview: response.topview })
        }
        else {
            return toast.error("Thất bại");

        }
    }
    getPagingCate = async (search) => {
        let response = await getCateApi().getPaging();
        if (response.length > 0) {
            this.props.getDataCate(response)
            this.setState({ cate: response })
        }
        else {
            return toast.error("Thất bại")
        }
    }
    toggle = () => {
        let isOpen = !this.state.isOpen
        this.setState({ isOpen })
    }
    showSettings = (event) => {
        event.preventDefault();
    }
    showdichvu = () => {
        this.setState({ dichvu: !this.state.dichvu })
    }
    // Search
    debounce(func, timeout = 400) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    delayHandelChange = this.debounce((eData) => this.props.getDataSearch(eData))
    handelChangeValue = (event) => {
        this.delayHandelChange(event.target.value)
    }
    render() {
        let { isOpen } = this.state
        var styles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '30px',
                height: '20px',
                right: '20px',
                top: '25px'
            },
            bmBurgerBars: {
                background: '#373a47'
            },
            bmBurgerBarsHover: {
                background: '#a90000'
            },
            bmCrossButton: {
                height: '24px',
                width: '24px'
            },
            bmCross: {
                background: '#bdc3c7'
            },
            bmMenuWrap: {
                position: 'fixed',
                height: '100%'
            },
            bmMenu: {
                background: '#373a47',
                padding: '2.5em 1.5em 0',
                fontSize: '1.15em'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmItem: {
                display: 'inline-block'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        }
        return (

            // <Suspense fallback={<div>Loading...</div>}>
            <div>
                {/* <HeaMenu/> */}

                {/* <Headroom
                
                    onPin={() => console.log('pinned')}
                    onUnpin={() => console.log('unpinned')}
                    wrapperStyle={{ marginTop: '0' }}
                    upTolerance="500px"
                    downTolerance='300px'

                    style={{
                        marginTop: '-150px',
                        transition: 'all .5s ease-in-out'
                    }}
                    > */}
                <div className='container-fluid w-100 px-0  bg-light fixed-top'>
                    <div style={{ display: !this.props.showScroll ? 'block' : 'none' }}>
                        <div className='row border-bottom info d-md-flex align-items-md-center px-2'>
                            <marquee behavior="scroll" direction="right" className="col-md-3 container ">
                                <span>{this.props.info.name} xin kính chào quý khách</span>
                            </marquee>
                            <div className="col-md-5 d-flex justify-content-center">Hotline miễn phí 24/7: {this.props.info.phone}</div>
                        </div>
                    </div>
                    <div>
                        <Navbar color="light" light expand="md" className='w-100 px-0 border-0 '>
                            <Row className="w-100 bs--gutter d-md-flex justify-content-md-between align-items-center">
                                <div className=' d-flex col-12 col-md-4 justify-content-md-center justify-content-between align-items-center'>
                                    <NavbarBrand >
                                        {/* <NavLink to="/trang-chu" activeClassName="activeLink"> */}
                                        <img onClick={() => this.props.history.push('/trang-chu')} className="webLogo" src={this.props.info.logo} alt="logo" />
                                        {/* </NavLink> */}
                                    </NavbarBrand>
                                    <div className=" flex-grow-1  d-md-none">
                                        <Form className=" mx-auto my-2 my-lg-0 pr-2 d-flex justify-content-end align-items-center box-search w-100">
                                            <input type="text" onChange={(e) => this.handelChangeValue(e)} value={this.state.search} placeholder="Nhập tên sản phẩm..." />
                                            <span className="">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </Form>
                                    </div>
                                    <div className='d-flex align-items-center me-3 justify-content-end  d-md-none'>
                                        <NavbarToggler
                                            className={isOpen ? 'd-none' : 'd-block'}
                                            onClick={this.toggle} />
                                        <div className={isOpen ? 'd-block' : 'd-none'} onClick={this.toggle} >
                                            <button className="btn btn-close">
                                                <div className="close-icon" ></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Col md={4} className="text-right d-md-block d-none">
                                    <Form className="d-flex justify-content-start align-items-center box-search ">
                                        <input type="text" onChange={(e) => this.handelChangeValue(e)} value={this.state.search} placeholder="Nhập tên sản phẩm..." />
                                        <span>
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </Form>
                                </Col>
                                <Col md={12} style={{ fontSize: '20px', letterSpacing: '2px' }} className='d-flex align-items-center pe-md-5 pe-0 justify-content-end'>
                                    <Row lg={1}  >
                                        <Collapse className={isOpen ? 'd-block show-collap' : 'd-block hide-collap'} navbar>
                                            <Nav navbar className="w-100">
                                                <Col lg={12} className="d-flex flex-md-row flex-column align-items-md-center align-items-end px-md-0 px-3">
                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link pe-md-4 ' onClick={this.toggle} to='/trang-chu' >Trang chủ</NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link pe-md-4' onClick={this.toggle} to='/gioi-thieu' >Giới thiệu</NavLink>
                                                    </NavItem>
                                                    <UncontrolledDropdown nav inNavbar className='pr-md-0 text-end pe-md-4'>
                                                        <DropdownToggle nav caret>
                                                            Sản phẩm
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            {this.state.cate.map((ca, i) => {
                                                                return <div className="text-end nav-link-my-item" key={i}>
                                                                    <DropdownItem >
                                                                        <NavLink activeClassName='choose' onClick={() => {
                                                                            this.props.getCateId(ca);
                                                                            this.toggle();
                                                                        }} className='nav-link ' to={'/danh-muc/' + To_slug(ca.name)} >{ca.name}</NavLink>
                                                                    </DropdownItem>
                                                                </div>
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <UncontrolledDropdown nav inNavbar className='pr-md-0 text-end pe-md-4'>
                                                        <DropdownToggle nav caret>
                                                            Dịch vụ
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            {this.props.services.map((sev, i) => {
                                                                return <div className="text-end nav-link-my-item" key={i}>
                                                                    <DropdownItem>
                                                                        <NavLink activeClassName='choose' onClick={() => {
                                                                            this.props.getService(sev);
                                                                            this.toggle();
                                                                        }} className='nav-link' to={'/dich-vu/' + To_slug(sev.name)} >{sev.name}</NavLink>
                                                                    </DropdownItem>
                                                                </div>
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    {/* <DropdownToggle nav caret onClick={() => this.showdichvu()}>
                                                            Dich vu
                                                        </DropdownToggle>
                                                        <Collapse className={this.state.dichvu ? 'd-block' : 'd-none'}>
                                                            <div>
                                                                {this.props.services.map((sev, i) => {
                                                                    return <div className="text-end" key={i}>
                                                                        <DropdownItem>
                                                                            <NavLink activeClassName='choose' onClick={() => {
                                                                                this.props.getService(sev);
                                                                                this.toggle();
                                                                            }} className='nav-link' to={'/service/' + To_slug(sev.name)} >{sev.name}</NavLink>
                                                                        </DropdownItem>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </Collapse> */}

                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link' to='/lien-he' >Liên hệ</NavLink>
                                                    </NavItem>
                                                </Col>
                                            </Nav>
                                        </Collapse>
                                    </Row>
                                </Col>
                            </Row>
                        </Navbar>
                    </div>
                </div>
                {/* </Headroom> */}
                <div className='justify-content-end d-md-none d-flex ms-auto' id="outer-container">
                    {/* <Menu styles={styles} right pageWrapId={'page-wrap'} outerContainerId={'outer-container'} >
                        <a id="page-wrap" className="menu-item" href="/">Home</a>
                        <a id="about" className="menu-item" href="/about">About</a>
                        <a id="contact" className="menu-item" href="/contact">Contact</a>
                        <a onClick={() => this.showSettings()} className="menu-item--small" href="">Settings</a>
                    </Menu> */}
                </div>

            </div>
            // </Suspense>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataCate: (cate) => {
            dispatch({ type: "GET_DATA_CATE", cate })
        },
        getService: (service) => {
            dispatch({ type: "GET_SERVICE", service: service })
        },
        getCateId: (cate) => {
            dispatch({ type: "GET_ID_CATE", id: cate._id, name: cate.name })
        },
        getDataSearch: (search) => {
            dispatch({ type: "GET_DATA_SEARCH", search })
        },

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        services: state.services,
        search:state.search
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))