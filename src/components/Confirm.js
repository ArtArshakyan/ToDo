import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function Confirm(props){

    return (
        <Modal
        show={true}
        onHide={props.onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure to remove {props.count} task{props.count>1 ? "s": ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button 
        onClick={props.onConfirm}
        variant='danger'
        >
        Delete
        </Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default Confirm;