import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { getServiceApi } from '../../custom/repositories/api.repository';
class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: ''
        }
    }
    componentDidMount = async () => {
        if (!this.props.service && !this.props.data) {
            let response = await getServiceApi().getOne(sessionStorage.getItem('service_id'));
            if (response.status) {
                this.setState({ service: response.data })
                // return toast.success("Thành công", { autoClose: 1000 });
            }
            else {
                return toast.error("Thất bại")
            }
        }
        else {
            // return toast.success("Thành công", { autoClose: 1000 });
        }
    }
    // componentDidUpdate = async (prevProps, prevState) => {
    //     if (this.props.service && this.props.service !== prevProps.service) {
    //         return toast.success("Thành công", { autoClose: 1000 });
    //     }
    // }
    render() {
        let data = this.state.service

        if (this.props.service) {
            data = this.props.service.post
        }
        if (this.props.data) {
            data = this.props.data
        }
        return (
            <div>
                <div className="container-md border p-4">
                    {ReactHtmlParser(data)}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        service: state.service
    }
}
export default withRouter(connect(mapStateToProps)(ViewPost));