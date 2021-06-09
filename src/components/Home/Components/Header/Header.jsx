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
import ViewPost from '../../../Share/ViewPost';
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
        // await this.getPaging();
        await this.getPagingCate();
    }
    // getPaging = async (search) => {
    //     let response = await getServiceApi().getAll();
    //     if (response.length > 0) {
    //         this.setState({ service: response })
    //         return toast.success("Thành công", { autoClose: 1000 });
    //     }
    //     else {
    //         return toast.error("Thành công")
    //     }
    // }
    getPagingCate = async (search) => {
        let response = await getCateApi().getPaging();
        if (response.length > 0) {
            this.props.getDataInfo(response)
            this.setState({ cate: response })
            return toast.success("Thành công", { autoClose: 1000 });
        }
        else {
            return toast.error("Thành công")
        }
    }
    toggle = () => {
        let isOpen = !this.state.isOpen
        this.setState({ isOpen })
    }
    render() {
        let { isOpen } = this.state
        console.log(this.props);
        return (
            <header id='header' className='container-fluid w-100 px-0 '>
                <div className='row border-bottom info d-md-flex align-items-md-center d-none px-2'>
                    <div className="col-md-6 "> <span>{this.props.info.name} xin kính chào quý khách</span></div>
                    <div className="col-md-6 d-flex justify-content-end">Hotline miễn phí 24/7: {this.props.info.phone}</div>
                </div>
                <Headroom >
                    <Navbar color="light" light expand="md" className='w-100 px-0 border-0 '>
                        <Row lg={2} className="w-100 bs--gutter">
                            <Col lg={4} className='d-md-flex justify-content-md-center'>
                                <NavbarBrand >
                                    <img className="webLogo" src={this.props.info.logo} width="150" height="50" alt="logo" />
                                </NavbarBrand>
                                <Col lg={12} className='d-flex align-items-center justify-content-end d-lg-none'>
                                    <NavbarToggler onClick={this.toggle} />
                                </Col>
                            </Col>
                            <Col lg={8} md={12} className='d-flex align-items-center justify-content-center'>
                                <Row lg={1}  >
                                    <Collapse className={isOpen ? 'd-block' : 'd-none'} navbar>
                                        <Nav navbar className="w-100">
                                            <Col lg={9} className="d-flex align-items-center px-0">
                                                <NavItem>
                                                    <NavLink activeClassName='choose' className='nav-link pr-md-0' to='/home' >Trang chủ</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink activeClassName='choose' className='nav-link pr-md-0' to='/introduce' >Giới thiệu</NavLink>
                                                </NavItem>
                                                <UncontrolledDropdown nav inNavbar className='pr-md-0'>
                                                    <DropdownToggle nav caret>
                                                        Sản phẩm
                                                </DropdownToggle>
                                                    <DropdownMenu right>
                                                        {this.state.cate.map((ca, i) => {
                                                            return <div key={i}>
                                                                <DropdownItem >
                                                                    <NavLink activeClassName='choose' className='nav-link' to={'/catelogy/' + To_slug(ca.name) + '/' + ca._id} >{ca.name}</NavLink>
                                                                </DropdownItem>
                                                            </div>
                                                        })}
                                                        {/* <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Tu-lanh' >Tủ lạnh</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/May-giat' >Máy giặt</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Binh-nong-lanh' >Bình nóng lạnh</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Lo-vi-song' >Lò vi sóng</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/May-loc-nuoc' >Máy lọc nước</NavLink></DropdownItem> */}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                <UncontrolledDropdown nav inNavbar className='pr-md-0'>
                                                    <DropdownToggle nav caret>
                                                        Dịch vụ
                                                </DropdownToggle>
                                                    <DropdownMenu right>
                                                        {this.props.services.map((sev, i) => {
                                                            return <div key={i}>
                                                                <DropdownItem>
                                                                    <NavLink activeClassName='choose' onClick={()=>this.props.getService(sev)} className='nav-link' to={'/service/' + To_slug(sev.name)} >{sev.name}</NavLink>
                                                                </DropdownItem>
                                                            </div>
                                                        })}
                                                        {/* <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-dieu-hoa' >Sửa điều hòa</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-tu-lanh' >Sửa tủ lạnh</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-may-giat' >Sửa máy giặt</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-binh-nong-lanh' >Sửa bình nóng lạnh</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-lo-vi-song' >Sửa lò vi sóng</NavLink></DropdownItem> */}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                <NavItem>
                                                    <NavLink activeClassName='choose' className='nav-link' to='/contact' >Liên hệ</NavLink>
                                                </NavItem>
                                            </Col>
                                            <Col lg={3}>
                                                <Form className="my-2 my-lg-0 pr-2 d-flex justify-content-end align-items-center ">
                                                    <Input type="text" placeholder="Search" />
                                                </Form>
                                            </Col>
                                        </Nav>
                                    </Collapse>
                                </Row>
                            </Col>
                        </Row>
                    </Navbar>
                </Headroom>

            </header>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataInfo: (cate) => {
            dispatch({ type: "GET_DATA_CATE", cate })
        },
        getService: (service) => {
            dispatch({ type: "GET_SERVICE", service })
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        services: state.services
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)