import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class ResutlSearch extends Component {
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.search !== prevProps.search) {
            if (this.props.search.trim('') !== '') {
                this.props.history.push('/trang-chu')
            }
        }
    }
    render() {
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
