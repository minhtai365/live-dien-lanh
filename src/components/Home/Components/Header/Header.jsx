import React, { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom'


export default class Header extends Component {
    render() {
        return (
            <header id='header' className='container-fluid'>
                <div className='row border-bottom info d-md-flex align-items-center d-none'>
                    <div className="col-md-6 "> <span>Điện lạnh Thế Ánh xin kính chào quý khách</span></div>
                    <div className="col-md-6 d-flex justify-content-end">Hotline miễn phí 24/7: 0942.939.691</div>
                </div>
                <nav className="navbar navbar-expand-sm navbar-light">
                    <div className="logo">
                        <a  href="index.html">
                            <img src="images/logo.png" />
                        </a>
                    </div>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <NavLink activeClassName='choose' className='nav-link' to='/Trang-chu' >Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  activeClassName='choose' className='nav-link' to='/Gioi-thieu' >Giới thiệu</NavLink>
                            </li>
                            <li className="nav-item dropdown choose">
                                <a 
                                className='nav-link dropdown-toggle' 
                                href="produc" 
                                id="producsId" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">Sản phẩm</a>
                                <div className="dropdown-menu" aria-labelledby="producsId">
                                    <NavLink activeClassName='choose' className='nav-link' to='/Dieu-hoa' >Điều hòa</NavLink>
                                    <NavLink activeClassName='choose' className='nav-link' to='/Tu-lanh' >Tủ lạnh</NavLink>
                                    <NavLink activeClassName='choose' className='nav-link' to='/May-giat' >Máy giặt</NavLink>
                                    <NavLink activeClassName='choose' className='nav-link' to='/Binh-nong-lanh' >Bình nóng lạnh</NavLink>
                                    <NavLink activeClassName='choose' className='nav-link' to='/Lo-vi-song' >Lò vi sóng</NavLink>
                                    <NavLink activeClassName='choose' className='nav-link' to='/May-loc-nuoc' >Máy lọc nước</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="produc" id="producsId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dịch vụ</a>
                                <div className="dropdown-menu" aria-labelledby="producsId">
                                    <NavLink  activeClassName='choose' className='nav-link' to='/Sua-dieu-hoa' >Sửa điều hòa</NavLink>
                                    <NavLink  activeClassName='choose' className='nav-link' to='/Sua-tu-lanh' >Sửa tủ lạnh</NavLink>
                                    <NavLink  activeClassName='choose' className='nav-link' to='/Sua-may-giat' >Sửa máy giặt</NavLink>
                                    <NavLink  activeClassName='choose' className='nav-link' to='/Sua-binh-nong-lanh' >Sửa bình nóng lạnh</NavLink>
                                    <NavLink  activeClassName='choose' className='nav-link' to='/Sua-lo-vi-song' >Sửa lò vi sóng</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName='choose' className='nav-link' to='/Lien-he' >Liên hệ</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form className="my-2 my-lg-0 d-flex justify-content-end">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                        </form>
                    </div>
                </nav>
            </header>
        )
    }
}
