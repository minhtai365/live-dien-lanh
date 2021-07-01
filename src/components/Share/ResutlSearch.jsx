import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class ResutlSearch extends Component {
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.search !== prevProps.search) {
            if (this.props.search.trim('') !== '') {
                this.props.history.push('/trang-chu')
            }
        }
    }
    render() {
        console.log(this.props);
        console.log(this.props.search);
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    search: state.search
})
export default connect(mapStateToProps)(withRouter(ResutlSearch))
