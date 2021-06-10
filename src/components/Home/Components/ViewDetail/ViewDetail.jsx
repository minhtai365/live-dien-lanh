import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewPost from '../../../Share/ViewPost';

function mapStateToProps(state) {
    return {
        product: state.product
    };
}

class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexImg: 0
        }
    }

    render() {
        const { product } = this.props
        return (
            <div className="container">
                <div className="row my-3">
                    <div className="col-6 d-flex justify-content-center">
                        <img src={product.img[this.state.indexImg]} width="400" height="300" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                        {product.img.map((im, i) =>
                            <div className="border" key={i}>
                                <img onClick={() => this.setState({ indexImg: i })} src={im} width="50" height="50" />
                            </div>)}
                    </div>
                </div>
                <div className="row">
                    <h3>Mô tả</h3>
                    <ViewPost data={product.post} />
                </div>
                <div className="row">
                    <h3>Sản phẩm tương tư</h3>

                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ViewDetail);