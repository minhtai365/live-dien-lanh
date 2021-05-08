import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';

import '../../css/table.css';
import '../../css/header.css';
export default class TableHeader extends Component {
    constructor() {
        super();
        this.handelChangeValue = this.handelChangeValue.bind(this);
    }
    handelChangeValue(event) {
        this.props.getPaging(event.target.value);
    }
    render() {
        let { toggleModal} = this.props;
        return (
            <div className=" d-flex justify-content-between" >
                <div style={{ padding: '10px' }} >
                    <button onClick={() => toggleModal()} className="button ml-4 btn-primary " >
                        {/* <SVG src={require('../../css/icons/plus.svg')} style={{ height: '20px', color: '#fff' }} /> */}
                    </button>
                </div>
                <div id="contacts-search">
                    <div className="col-12">
                        <input onChange={this.handelChangeValue} type="text" id="contacts-search-input" className="form-control" placeholder="Search" />
                    </div>
                </div>
            </div>
        )
    }
}
