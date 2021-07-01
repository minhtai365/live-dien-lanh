import React, { Component } from 'react'
import { withRouter } from 'react-router';

class ChangeTitle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            document.title = this.props.location.pathname
        }
    }
    componentDidMount() {
        document.title = this.props.location.pathname
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default withRouter(ChangeTitle)