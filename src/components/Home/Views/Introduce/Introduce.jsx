import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getInfoApi } from '../../../../custom/repositories/api.repository';
import ReactHtmlParser from 'react-html-parser';
import ViewPost from '../../../Share/ViewPost';
class Introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }
    // async componentWillMount() {
    //     // await this.getPaging();
    //     return toast.success("Thành công", { autoClose: 1000 });
    // }
    // getPaging = async (search) => {
    //     let response = await getInfoApi().getPaging({ search });
    //     if (response) {
    //         this.setState({ info: response[0] })
    //         return toast.success("Thành công", { autoClose: 1000 });
    //     }
    //     else {
    //         return toast.error("Thành công")
    //     }
    // }
    render() {
        return (
            <div>
                <div className="container border p-4">
                    <ViewPost data={this.props.info.introduce}/>
                </div>
                {/* <ToastContainer /> */}
            </div>
        );
    }
}

export default Introduce;