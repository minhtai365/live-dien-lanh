import React from 'react';
// import SVG from 'react-inlinesvg';
import { NavLink, withRouter } from 'react-router-dom';
import '../../css/header.css';
import '../../css/table.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [

        { to: 'info', view: 'Thông tin' },
        { to: 'catelogy', view: 'Danh mục' },
        { to: 'product', view: 'Sản phẩm' },
        { to: 'service', view: 'Dịch vụ' },
        // { to: 'promotion', view: 'Khuyến mãi' },
        { to: 'slide', view: 'Slide' },
      ],
      showMenu: false
    }
  }

  renderHeader = () => {
    return this.state.headers.map((header, index) => {
      return (
        <li key={index} className="nav-item">
          <NavLink activeClassName='choose' onClick={() => this.setState({ showMenu: !this.state.showMenu })} className="nav-link header" to={'/admin/' + header.to}>{header.view}</NavLink>
        </li>

      )
    })
  }
  handleLogOut = () => {
    this.setState({ showMenu: !this.state.showMenu });
    localStorage.removeItem('token');
    this.props.getAuthenticated(false);
  }
  render() {
    return (
      <div className="position-fixed w-100 bg-light" style={{ top: '0', left: '0', zIndex: '2', height: 'fit-content' }}>
        <nav className="navbar navbar-expand-lg bg-light head-nav w-100" >

          <ul className="navbar-nav mr-auto flex-column flex-lg-row mt-2 mt-lg-0 w-100 w-lg-75">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <a href="/trang-chu" target='_blank'>
                  <img src={this.props.info.logo} className="logo" alt="Hình" />
                </a>
              </div>
              <button onClick={() => this.setState({ showMenu: !this.state.showMenu })} className="navbar-toggler text-right font-weight-bold ms-auto text-dark" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                MENU
                {/* {this.state.showMenu ?
                <SVG src={require('../../css/icons/close.svg')} style={{ width: '30px', color: '#000', marginTop: '-5px' }} />
                : <SVG src={require('../../css/icons/menu.svg')} style={{ width: '25px', fill: '#000', marginTop: '-5px', marginLeft: '5px' }} />} */}
              </button>

            </div>
            <div className="d-lg-block d-none ms-auto">
              {this.renderHeader()}

              <li className="nav-item">
                <NavLink activeClassName='' onClick={() => this.handleLogOut()} className="nav-link header" to={'/admin'}>ĐĂNG XUẤT</NavLink>
              </li>
            </div>
            {this.state.showMenu && <div className="d-lg-none d-flex flex-column">
              {this.renderHeader()}
              <li className="nav-item">
                <NavLink activeClassName='' onClick={() => this.handleLogOut()} className="nav-link header" to={'/admin'}>ĐĂNG XUẤT</NavLink>
              </li>
            </div>}
            {/* {this.state.showMenu && <div className='d-lg-none header font-weight-bold ml-0 pl-0' style={{ cursor: 'pointer', color: '#000', paddingInline: '0' }} onClick={() => this.onClickLogout()}>ĐĂNG XUẤT</div>} */}

          </ul>
          {/* <div className='d-lg-block d-none header font-weight-bold ml-0 pl-0' style={{ cursor: 'pointer', color: '#000', width: '130px' }} onClick={() => this.onClickLogout()}>ĐĂNG XUẤT</div> */}
        </nav>
      </div>
    );
  }
}
export default withRouter(Header);
