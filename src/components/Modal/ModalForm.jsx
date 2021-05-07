import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';

export default class ModalForm extends Component {
    render() {
        let {onClose,show,size}=this.props;
        return (
            <div>
                <Modal
                    size={size}
                    show={show}
                    onHide={onClose}
                >
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
