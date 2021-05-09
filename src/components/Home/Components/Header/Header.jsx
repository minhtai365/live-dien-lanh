import React, { Component } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
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


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
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
                <div className='row border-bottom info d-md-flex align-items-center d-none px-2'>
                    <div className="col-md-6 "> <span>Điện lạnh Thế Ánh xin kính chào quý khách</span></div>
                    <div className="col-md-6 d-flex justify-content-end">Hotline miễn phí 24/7: 0942.939.691</div>
                </div>
                <Navbar color="light" light expand="md" className='w-100 px-0 '>
                    <Row lg={2} className="w-100 bs--gutter">
                        <Col lg={4} className='d-md-flex justify-content-md-center'>
                            <NavbarBrand >
                                <img className="webLogo" src="images/logo.png" alt="logo" />
                            </NavbarBrand>
                            <Col lg={12}  className='d-flex align-items-center justify-content-end d-lg-none'>
                            <NavbarToggler onClick={this.toggle} />
                            </Col>
                        </Col>
                        <Col lg={8} md={12} className='d-flex align-items-center justify-content-center'>
                            <Row lg={1}  >
                                <Collapse className={isOpen? 'd-block':'d-none'} navbar>
                                    <Nav navbar className="w-100">
                                        <Col lg={9} className="d-flex align-items-center px-0">
                                            <NavItem>
                                                <NavLink activeClassName='choose' className='nav-link pr-md-0' to='/Trang-chu' >Trang chủ</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink activeClassName='choose' className='nav-link pr-md-0' to='/Gioi-thieu' >Giới thiệu</NavLink>
                                            </NavItem>
                                            <UncontrolledDropdown nav inNavbar className='pr-md-0'>
                                                <DropdownToggle nav caret>
                                                    Sản phẩm
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Dieu-hoa' >Điều hòa</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Tu-lanh' >Tủ lạnh</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/May-giat' >Máy giặt</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Binh-nong-lanh' >Bình nóng lạnh</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Lo-vi-song' >Lò vi sóng</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/May-loc-nuoc' >Máy lọc nước</NavLink></DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <UncontrolledDropdown nav inNavbar className='pr-md-0'>
                                                <DropdownToggle nav caret>
                                                    Dịch vụ
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                   <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-dieu-hoa' >Sửa điều hòa</NavLink></DropdownItem>
                                                   <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-tu-lanh' >Sửa tủ lạnh</NavLink></DropdownItem>
                                                   <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-may-giat' >Sửa máy giặt</NavLink></DropdownItem>
                                                   <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-binh-nong-lanh' >Sửa bình nóng lạnh</NavLink></DropdownItem>
                                                   <DropdownItem><NavLink activeClassName='choose' className='nav-link' to='/Sua-lo-vi-song' >Sửa lò vi sóng</NavLink></DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <NavItem>
                                                <NavLink activeClassName='choose' className='nav-link' to='/Lien-he' >Liên hệ</NavLink>                                                
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
            </header>
        )
    }
}
