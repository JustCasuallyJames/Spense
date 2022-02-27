import '../styles/GroupPreview.scss';
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { ReactComponent as CopyLink } from '../styles/graphics/copy_link.svg';

const GroupPreview = (props) => {



    return (
        <div id="group-container">
            <Container fluid>
                <Row className="align-items-center">
                    <Col md={11}id="title">
                        <p>{props.name}</p>
                    </Col>
                    <Col md={1}>
                        <CopyLink id="copy-link"/>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default GroupPreview;