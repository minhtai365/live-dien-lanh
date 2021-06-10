import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getInfoApi } from '../../../../custom/repositories/api.repository';
import ReactHtmlParser from 'react-html-parser';
import ViewPost from '../../../Share/ViewPost';
class Introduce extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ViewPost data={this.props.info.introduce} />
            </div>
        );
    }
}

export default Introduce;