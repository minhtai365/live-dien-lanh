import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getInfoApi } from '../../../../custom/repositories/api.repository';
import ReactHtmlParser from 'react-html-parser';
class Introduce extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="container border p-4">
                    {ReactHtmlParser(this.props.info.introduce)}
                </div>
            </div>
        );
    }
}

export default Introduce;