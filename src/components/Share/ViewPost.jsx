import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { getServiceApi } from '../../custom/repositories/api.repository';
class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }

    }
    componentDidMount = async () => {
        return toast.success("Thành công", { autoClose: 1000 });
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.service && this.props.service !== prevProps.service) {
            return toast.success("Thành công", { autoClose: 1000 });
        }
    }

    // getOneService = async () => {
    //     let response = await getServiceApi().getOne(this.props.match.params.id);
    //     if (response.status) {
    //         this.setState({ data: response.data })
    //         return toast.success("Thành công", { autoClose: 1000 });
    //     }
    //     else {
    //         return toast.error("Thành công")
    //     }
    // }
    render() {
        let data = this.props.service.post
        if (this.props.data) {
            data = this.props.data
        }
        return (
            <div>
                <div className="container border p-4">
                    {ReactHtmlParser(data)}
                </div>
                <ToastContainer />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        services: state.services,
        service: state.service
    }
}
export default withRouter(connect(mapStateToProps)(ViewPost));