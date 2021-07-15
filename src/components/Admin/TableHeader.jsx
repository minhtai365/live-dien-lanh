import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';

import '../../css/table.css';
import '../../css/header.css';
export default class TableHeader extends Component {
    // constructor() {
    //     super();
    //     this.handelChangeValue = this.handelChangeValue.bind(this);
    // }
    // Search
    debounce(func, timeout = 400) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    delayHandelChange = this.debounce((eData) => {
        this.props.getDataSearch(eData)
    })
    handelChangeValue = (event) => {
        this.delayHandelChange(event.target.value)
        // this.props.getPaging(event.target.value);
    }
    render() {
        let { toggleModal } = this.props;
        return (
            <div className=" d-flex justify-content-between" >
                <div style={{ padding: '10px' }} >
                    <button onClick={() => toggleModal()} title="Thêm" className="button ml-4 btn-primary " >
                        <i className="fas fa-plus-circle"></i>
                        {/* <SVG src={require('../../css/icons/plus.svg')} style={{ height: '20px', color: '#fff' }} /> */}
                    </button>
                </div>
                {this.props.type === 'product' ?
                    <div id="contacts-search" className='d-flex align-items-center'>
                        {/* <select onChange={this.changeRow} style={{
                            // width: '40px',
                            color: '#fff',
                            height: '32px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#198754',
                            outline: 'none',
                            paddingInline:'10px'
                        }}>
                            <option value="date">Mới nhất</option>
                            <option value="name">Tên</option>
                            <option value="cate">Loại</option>
                        </select> */}
                        <div className="col-12">
                            <input onChange={(e) => this.handelChangeValue(e)} type="text" id="contacts-search-input" className="form-control" placeholder="Nhập từ khóa ..." />
                        </div>
                    </div> : ''}

            </div>
        )
    }
}
