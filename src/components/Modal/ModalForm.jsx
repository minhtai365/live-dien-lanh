import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';

export default class ModalForm extends Component {
    render() {
        let { onClose, show, size } = this.props;
        return (
            <div>
                <Modal
                    size={size}
                    show={show}
                    onHide={onClose}
                    // aria-labelledby="contained-modal-title-vcenter"
                    // centered
                // dialogClassName="modal-90w"
                >
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
