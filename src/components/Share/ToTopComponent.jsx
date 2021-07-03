import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ToTopComponent extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
            // window.scrollIntoView({ block: "end", behavior: "smooth" });
        }
    }
    render() {
        return (
            <div >
                <React.Fragment />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataSearch: (search) => {
            dispatch({ type: "GET_DATA_SEARCH", search })
        },
    }
}
export default connect('', mapDispatchToProps)(withRouter(ToTopComponent))
