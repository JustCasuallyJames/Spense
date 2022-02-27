import '../styles/TransactionPreview.scss';
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";

const TransactionPreview = (props) => {



    return (
        <div id="group-container">
            <Container fluid>
                <Row className="align-items-center">
                    <Col md={9} id="title">
                        <span id="send-receive">{props.sender} owes {props.receiver}</span>
                        <p>"{props.title}"</p>
                    </Col>
                    <Col md={3}>
                        <span id="dollar">${props.amount}</span>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default TransactionPreview;