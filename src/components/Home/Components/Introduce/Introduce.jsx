import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Loading from '../../../Share/Loading';
class Introduce extends Component {
    // componentDidMount() {
    //     return toast.success("Thành công", { autoClose: 1000 });
    // }

    render() {
        return (
            !this.props.info.introduce ? <Loading /> :
                <div>
                    <div className="container-md border p-4">
                        {ReactHtmlParser(this.props.info.introduce)}
                    </div>
                </div>
        );
    }
}

export default Introduce;