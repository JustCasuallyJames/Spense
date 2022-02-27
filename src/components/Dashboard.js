
//react stuff
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//firestore stuff
import { setDoc, doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
//graphics stuff
import { ReactComponent as SpenseLogo } from '../styles/graphics/spense.svg';
import { ReactComponent as AddGroup } from "../styles/graphics/add_new_group.svg";
import { ReactComponent as Receipt } from "../styles/graphics/receipt_3.svg";
//scss files
import '../styles/Dashboard.scss';
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
//database import
import db from "../database";

const Dashboard = (props) => {

    const [username, setusername] = useState("");
    const [nickname, setnickname] = useState("");
    const [groupName, setgroupName] = useState("");
    const [groupID, setgroupID] = useState("");
    const [showNew, setshowNew] = useState(false);
    const [showJoin, setshowJoin] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');

    const handleCloseNew = () => setshowNew(false);
    const handleShowNew = () => setshowNew(true);

    const handleCloseJoin = () => setshowJoin(false);
    const handleShowJoin = () => setshowJoin(true);


    let navigate = useNavigate();
    let landing = () => {
        navigate("/");
    }

    let handleSubmitNew = e => {
        e.preventDefault();
        // addGroup();
        // //console.log("Successfully added a group to the database: ", groupName);
        handleCloseNew();
        setgroupName("");
    }

    let handleSubmitJoin = e => {
        e.preventDefault();
        handleCloseJoin();
        console.log("Successfully added a new group id to the users database", groupID);
        setgroupID("");
    }

    return (
        <div id="background">
            <SpenseLogo id="logo" onClick={landing} />
            <Container fluid id="dashboard" >
                <Row>
                    <Col><span id="welcome-text">Welcome Back, {nickname}!</span></Col>
                    <Col >
                        <Button id="join-group-btn" onClick={handleShowJoin}>Join Group</Button>
                        <Button id="new-group-btn" onClick={handleShowNew}>New Group</Button>
                    </Col>
                </Row>
                <br></br>
                <Row >
                    <Col style={{ textAlign: "center" }}>
                        <AddGroup id="add-group-svg" />
                    </Col>

                </Row>
            </Container>

            <Modal show={showNew} onHide={handleCloseNew} size="lg" centered>
                <Modal.Header closeButton style={{ borderBottom: "0 none" }}>
                    <Modal.Title className="modal-title">New Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col xs={6} >
                                <Form onSubmit={handleSubmitNew}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Group Name</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="ex: KBBQ Hangout"
                                            onChange={(e) => setgroupName(e.target.value)}
                                            value={groupName}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="new-group-submit-btn" type="submit">
                                        Create Group
                                    </Button>
                                </Form>
                            </Col>
                            <Col xs={6}>
                                <Receipt></Receipt>
                            </Col>
                        </Row>

                    </Container>

                </Modal.Body>
            </Modal>


            <Modal show={showJoin} onHide={handleCloseJoin} size="lg" centered>
                <Modal.Header closeButton closeButton style={{ borderBottom: "0 none" }}>
                    <Modal.Title className="modal-title">Join Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col xs={6}>
                                <Form onSubmit={handleSubmitJoin}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Group ID</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="ex: asdjiq8a10"
                                            onChange={(e) => setgroupID(e.target.value)}
                                            value={groupID}
                                            required
                                        />
                                    </Form.Group>
                                    <Button  type="submit" className="new-group-submit-btn" >
                                        Join Group
                                    </Button>
                                </Form>
                            </Col>
                            <Col xs={6}>
                                <Receipt/>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Dashboard;