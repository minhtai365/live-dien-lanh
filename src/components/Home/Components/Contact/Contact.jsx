import React, { Component } from 'react';
import Loading from '../../../Share/Loading';

class Contact extends Component {
    // componentDidMount() {
    //     return toast.success("Thành công", { autoClose: 1000 });
    // }
    render() {
        const { info } = this.props
        return (

            !info.name ? <Loading /> :
                <div className="container-md border">
                    <div className="row">
                        <div className="col">
                            <h5>{info.name}</h5>
                            <p>Địa chỉ: {info.address}</p>
                            <p>Số điện thoại: {info.phone}</p>
                            <p>Email: {info.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31345.848545978115!2d106.61735299999998!3d10.870021999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1623141743941!5m2!1svi!2s"
                                style={{ width: '100%', height: '500px', border: '0' }} title="Địa chỉ" frameBorder="0" aria-hidden="false" tabIndex="0" />
                        </div>
                    </div>
                </div>
        );
    }
}

export default Contact;