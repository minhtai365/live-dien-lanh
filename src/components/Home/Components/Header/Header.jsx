import React, { Component } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
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
import { getCateApi, getServiceApi } from '../../../../custom/repositories/api.repository';
import { toast } from 'react-toastify';
import { To_slug } from '../../custom/toSlug';
import { connect } from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            service: [],
            cate: [],
        }
    }
    async componentDidMount() {
        await this.getPagingCate();
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
    render() {
        let { isOpen } = this.state
        return (
            <header id='header' className='container-fluid w-100 px-0 '>
                <div className='row border-bottom info d-md-flex align-items-md-center d-none px-2'>
                    <div className="col-md-7 "> <span>{this.props.info.name} xin kính chào quý khách</span></div>

                    <div className="col-md-5 d-flex justify-content-end">Hotline miễn phí 24/7: {this.props.info.phone}</div>
                </div>
                <Headroom >
                    <div>
                        <Navbar color="light" light expand="md" className='w-100 px-0 border-0 '>
                            <Row className="w-100 bs--gutter d-md-flex justify-content-md-between">
                                <Col md={4} className='d-flex justify-content-md-center justify-content-between align-items-center'>
                                    <NavbarBrand >
                                        <img className="webLogo" src={this.props.info.logo} width="120" height="50" alt="logo" />
                                    </NavbarBrand>
                                    <div className="col-6 d-md-none">
                                        <Form className="my-2 w-sm-75 my-lg-0 pr-2 d-flex justify-content-end align-items-center box-search ">
                                            <input type="text" placeholder="Nhập tên sản phẩm..." />
                                            <span className="">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </Form>
                                    </div>
                                    <Col lg={6} className='d-flex align-items-center justify-content-end d-lg-none'>
                                        <NavbarToggler onClick={this.toggle} />
                                    </Col>
                                </Col>
                                <Col md={4} className="text-right d-md-block d-none">
                                    <Form className="my-2 my-lg-0 pr-2 d-flex justify-content-start align-items-center box-search ">
                                        <input type="text" placeholder="Nhập tên sản phẩm..." />
                                        <span>
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </Form>
                                </Col>
                                <Col md={12} style={{fontSize:'20px',letterSpacing:'2px'}} className='d-flex align-items-center pe-md-5 pe-0 justify-content-end'>
                                    <Row lg={1}  >
                                        <Collapse className={isOpen ? 'd-block' : 'd-none'} navbar>
                                            <Nav navbar className="w-100">
                                                <Col lg={12} className="d-flex flex-md-row flex-column align-items-md-center align-items-end px-md-0 px-3">
                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link pe-md-4 ' onClick={this.toggle} to='/home' >Trang chủ</NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link pe-md-4' onClick={this.toggle} to='/introduce' >Giới thiệu</NavLink>
                                                    </NavItem>
                                                    <UncontrolledDropdown nav inNavbar className='pr-md-0 text-end pe-md-4'>
                                                        <DropdownToggle nav caret>
                                                            Sản phẩm
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            {this.state.cate.map((ca, i) => {
                                                                return <div className="text-end" key={i}>
                                                                    <DropdownItem >
                                                                        <NavLink activeClassName='choose' onClick={() => {
                                                                            this.props.getCateId(ca._id);
                                                                            this.toggle();
                                                                        }} className='nav-link ' to={'/catelogy/' + To_slug(ca.name)} >{ca.name}</NavLink>
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
                                                                return <div className="text-end" key={i}>
                                                                    <DropdownItem>
                                                                        <NavLink activeClassName='choose' onClick={() => {
                                                                            this.props.getService(sev);
                                                                            this.toggle();
                                                                        }} className='nav-link' to={'/service/' + To_slug(sev.name)} >{sev.name}</NavLink>
                                                                    </DropdownItem>
                                                                </div>
                                                            })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <NavItem>
                                                        <NavLink activeClassName='choose' className='nav-link' to='/contact' >Liên hệ</NavLink>
                                                    </NavItem>
                                                </Col>
                                            </Nav>
                                        </Collapse>
                                    </Row>
                                </Col>
                            </Row>
                        </Navbar>

                    </div>
                </Headroom>
            </header>
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
        getCateId: (id) => {
            dispatch({ type: "GET_ID_CATE", id })
        },
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        services: state.services
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)