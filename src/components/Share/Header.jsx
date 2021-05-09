import React from 'react';
// import SVG from 'react-inlinesvg';
import { NavLink, withRouter } from 'react-router-dom';
import '../../css/table.css';
import '../../css/header.css';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        { to: 'catelogy', view: 'Danh mục' },
        { to: 'product', view: 'Sản phẩm' },
        { to: 'service', view: 'Dịch vụ' },
        { to: 'promotion', view: 'Khuyến mãi' },
        { to: 'slide', view: 'Slide' },
        { to: 'info', view: 'Thông tin' },
      ],
      showMenu: false
    }
  }
  componentDidMount = () => {
    if (sessionStorage.getItem('mode') === 'provider') {
      let headers = this.state.headers;
      let findCompany = headers.filter(com => com.to !== 'company');
      this.setState({ headers: findCompany });
    }
  }
  renderHeader = () => {
    return this.state.headers.map((header, index) => {
      return (
        <li key={index} className="nav-item">
          <NavLink activeClassName='choose' className="nav-link header" to={'/' + header.to}>{header.view}</NavLink>
        </li>

      )
    })
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-light head-nav w-100" >
        <ul className="navbar-nav mr-auto flex-column flex-lg-row mt-2 mt-lg-0 w-100 w-lg-75">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <img src='./images/logoglink.png' className="logo" />
            </div>
            <button onClick={() => this.setState({ showMenu: !this.state.showMenu })} className="navbar-toggler text-right font-weight-bold ml-auto text-dark" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              MENU
          {/* {this.state.showMenu ?
                <SVG src={require('../../css/icons/close.svg')} style={{ width: '30px', color: '#000', marginTop: '-5px' }} />
                : <SVG src={require('../../css/icons/menu.svg')} style={{ width: '25px', fill: '#000', marginTop: '-5px', marginLeft: '5px' }} />} */}
            </button>

          </div>
          <div className="d-lg-block d-none">
            {this.renderHeader()}
          </div>
          {this.state.showMenu && <div className="d-lg-none d-flex flex-column">
            {this.renderHeader()}
          </div>}
          {this.state.showMenu && <div className='d-lg-none header font-weight-bold ml-0 pl-0' style={{ cursor: 'pointer', color: '#000' }} onClick={() => this.onClickLogout()}>ĐĂNG XUẤT</div>}
        </ul>
        <div className='d-lg-block d-none header font-weight-bold ml-0 pl-0' style={{ cursor: 'pointer', color: '#000', width: '120px' }} onClick={() => this.onClickLogout()}>ĐĂNG XUẤT</div>
      </nav>
    );
  }
}
export default withRouter(Header);
