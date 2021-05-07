import React, { Component } from 'react';
// import SVG from 'react-inlinesvg';

export default class TableHeader extends Component {
    constructor() {
        super();
        this.handelChangeValue = this.handelChangeValue.bind(this);
    }
    handelChangeValue(event) {
        this.props.getPaging(event.target.value);
    }
    render() {
        let { toggleModal, type } = this.props;
        return (
            <div className="p-0" >
                {window.location.pathname === '/review' ?
                    <div></div>
                    :
                    <div className="float-left " style={{ padding: '10px' }} >
                        <button onClick={() => toggleModal(type)} className="button ml-4 btn-primary " >
                            {/* <SVG src={require('../../css/icons/plus.svg')} style={{ height: '20px', color: '#fff' }} /> */}
                        </button>
                    </div>}
                <div id="contacts-search" className="row mr-4 float-right">
                    <div className="col-12">
                        <input onChange={this.handelChangeValue} type="text" id="contacts-search-input" className="form-control" placeholder="Search" />
                    </div>
                </div>
            </div>
        )
    }
}
