import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const QuestionPopup = (props) => {
    const [show, setShow] = useState(props.show);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Modal show={show} onHide={() => props.onClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => props.onClosePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
 
export default QuestionPopup;
