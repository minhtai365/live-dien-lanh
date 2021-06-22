import React, { Component } from 'react'
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
export default withRouter(ToTopComponent)
