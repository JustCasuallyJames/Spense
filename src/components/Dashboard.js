
//react stuff
import {React, useEffect, useState} from 'react';
//firestore stuff
import { updateDoc,setDoc, doc, getDoc, arrayUnion, arrayRemove, addDoc, collection } from "firebase/firestore";
//graphics stuff
import { ReactComponent as SpenseLogo } from '../styles/graphics/spense.svg';
import { ReactComponent as AddGroup } from "../styles/graphics/add_new_group.svg";
//scss files
import '../styles/Dashboard.scss';
import {Button, Col, Container, Row, Modal, InputGroup, Form} from "react-bootstrap";
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

    useEffect( () => {
        getUsername();
    },[])

    const handleCloseNew = () => setshowNew(false);
    const handleShowNew = () => setshowNew(true);

    const handleCloseJoin = () => setshowJoin(false);
    const handleShowJoin = () => setshowJoin(true);

    let getUsername = async () => {
        //TODO: grab the username from localstorage when the register file is done
        const docRef = doc(db, "Users", "elvis123");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setnickname(docSnap.data().nickname);
            setusername(docSnap.data().username);
            return docSnap.data();
        }else{
            console.log("doesn't exist");
        }
    }

    let generateGroupID = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let addGroup = async () => {
        if(groupName !== "") {
            let randomID = generateGroupID(10);
            let docSnap = await getDoc(doc(db, "GroupIDS", randomID));

            if (!docSnap.exists()) {
                //add to the groupsID collection
                await setDoc(doc(db, "GroupIDS", randomID), {}); //doesnt have data to store
                const data = {
                    name: groupName
                };
                await setDoc(doc(db, "Groups", randomID), data);
                //add to the users group array
                await updateDoc(doc(db, "Users", username), {
                    Groups: arrayUnion(randomID)
                });

            } else {
                randomID = generateGroupID(10);
                docSnap = getDoc(doc(db, "GroupIDS", randomID));
                while (!docSnap.exists()) {
                    randomID = generateGroupID(10);
                    docSnap = getDoc(doc(db, "GroupIDS", randomID));
                }

                //add to the groupsID collection
                await setDoc(doc(db, "GroupIDS", randomID), {}); //doesnt have data to store
                const data = {
                    name: groupName
                };
                // sets the groupName as a field
                await setDoc(doc(db, "Groups", randomID), data);
                //add to the users group array
                await updateDoc(doc(db, "Users", username), {
                    Groups: arrayUnion(randomID)
                });
            }
        }
    }

    let joinGroup = async () => {
        if(joinGroup !== ""){
            //tJNV8OldT0
            let docSnap = await getDoc(doc(db, "Groups", groupID));

            console.log(docSnap.data());
             if(docSnap.exists()){
                //add to the users group array
                console.log('entered into the if statement')
                await updateDoc(doc(db, "Users", username), {
                    Groups: arrayUnion(groupID)
                });
                //setLoginStatus('');
            }else{
                 console.log('enter into else statement');
                 setLoginStatus("Group does not exist.");
            }
        }
    }
    let handleSubmitNew = e => {
        e.preventDefault();
        addGroup();
        handleCloseNew();
        setgroupName("");
    }

    let checkLoginStatus = () => {
        return loginStatus === "Group does not exist.";
    }
    let handleSubmitJoin = e => {
        joinGroup();
        console.log("login status: ", {loginStatus})
        if(loginStatus === "Group does not exist."){
            e.preventDefault();
            handleCloseJoin();
            // setgroupID("");
            setLoginStatus("Group does not exist.");
        }else{
            setLoginStatus("");
        }

    }

    return(
        <Container className="background-container">
            <Row>
                <Col sm={9}>
                    <SpenseLogo id="logo" />
                </Col>
                <Col sm={3} className="topNav-dashboard">
                    <Button onClick={handleShowNew}>
                        New Group +
                    </Button>
                    <Modal show={showNew} onHide={handleCloseNew}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitNew}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control
                                        type="username"
                                        placeholder="ex: KBBQ Hangout"
                                        onChange={ (e) => setgroupName(e.target.value)}
                                        value={groupName}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Group
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Button onClick={handleShowJoin}>
                        Join Group
                    </Button>
                    <Modal show={showJoin} onHide={handleCloseJoin}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitJoin}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Group ID</Form.Label>
                                    <Form.Control
                                        type="username"
                                        placeholder="ex: asdjiq8a10"
                                        onChange={ (e) => setgroupID(e.target.value)}
                                        value={groupID}
                                    />
                                    <Form.Text style={{color: "red"}}>{loginStatus}</Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Join Group
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <Row id="welcome-text">
                Welcome Back, { nickname }!
            </Row>
            <Row>
                <AddGroup />
            </Row>
        </Container>
    );
}

export default Dashboard;