
//react stuff
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupPreview from './GroupPreview';
import Transactions from './Transactions';
//firestore stuff
import { updateDoc,setDoc, doc, getDoc, arrayUnion, arrayRemove, addDoc, collection } from "firebase/firestore";
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
    const [userGroups, setuserGroups] = useState([]);
    const [showAdd, setshowAdd] = useState(true);
    const [showTransaction, setshowTransaction] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const [selectedGroupName, setselectedGroupName] = useState("");
    const [selectedGroup, setselectedGroup] = useState("");

    let navigate = useNavigate();

    let landing = () => {
        navigate('/');
    }

    let transaction = () => {
        navigate('dashboard/transaction', {groupInfo: userGroups});
    }

    useEffect( () => {
        getUsername();
        getUserGroups();
    },[])

    const handleCloseNew = () => setshowNew(false);
    const handleShowNew = () => setshowNew(true);

    const handleCloseJoin = () => setshowJoin(false);
    const handleShowJoin = () => setshowJoin(true);

    let getUserGroups = () => {
        setuserGroups(JSON.parse(localStorage.getItem('groups')));
        if (JSON.parse(JSON.parse(localStorage.getItem('groups')).length != 0)) {
            setshowAdd(false);
        }
    }
    let getUsername =  () => {
        //TODO: grab the username from localstorage when the register file is done
        // const docRef = doc(db, "Users", "elvis123");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     setnickname(docSnap.data().nickname);
        //     setusername(docSnap.data().username);
        //     return docSnap.data();
        // }else{
        //     console.log("doesn't exist");
        // }
        setnickname(JSON.parse(localStorage.getItem("user")).nickname);
        setusername(JSON.parse(localStorage.getItem("user")).username);
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
                setgroupID(randomID);
                await setDoc(doc(db, "GroupIDS", randomID), {}); //doesnt have data to store
                const data = {
                    //TODO:add transactions[], users[]
                    name: groupName,
                    transactions: [],
                    users: [ nickname ],
                    groupID: groupID

                };
                await setDoc(doc(db, "Groups", randomID), data);
                //add to the users group array
                await updateDoc(doc(db, "Users", username), {
                    groups: arrayUnion(randomID)
                });
                if(JSON.parse(localStorage.getItem('groups')).length === 0){
                    localStorage.setItem('groups', [JSON.stringify(data)] );
                    setuserGroups([JSON.stringify(data)]);
                }else{
                    let tempGroupArray = JSON.parse(localStorage.getItem('groups'));
                    tempGroupArray.push(JSON.stringify(data));
                    setuserGroups(tempGroupArray);
                    //console.log(JSON.parse(JSON.stringify(tempGroupArray)));
                    localStorage.setItem('groups', JSON.stringify(tempGroupArray))
                    let temp = JSON.parse(localStorage.getItem('user')).groups;
                    temp.push(randomID);
                    localStorage.setItem('user', JSON.stringify({nickname: nickname, username: username, groups: temp }))

                    //TODO: AND ADDING GROUPS ID INTO USER GROUP ID ARRAY
                    let tempIDArray = JSON.parse(localStorage.getItem('user')).groups.concat(groupID);
                    localStorage.setItem('user', JSON.stringify({nickname: nickname, username: username, groups: tempIDArray }))
                
                }


            } else {
                randomID = generateGroupID(10);
                docSnap = getDoc(doc(db, "GroupIDS", randomID));
                while (!docSnap.exists()) {
                    randomID = generateGroupID(10);
                    docSnap = getDoc(doc(db, "GroupIDS", randomID));
                }
                setgroupID(randomID);
                //add to the groupsID collection
                await setDoc(doc(db, "GroupIDS", randomID), {}); //doesnt have data to store
                const data = {
                    name: groupName,
                    transactions: [],
                    users: [ nickname ],
                    groupID: groupID
                };
                // sets the groupName as a field
                await setDoc(doc(db, "Groups", randomID), data);
                //add to the users group array
                await updateDoc(doc(db, "Users", username), {
                    groups: arrayUnion(randomID)
                });
                if(JSON.parse(localStorage.getItem('groups')).length === 0){
                    localStorage.setItem('groups', [JSON.stringify(data)] );
                    setuserGroups([JSON.stringify(data)]);
                }else{
                    let tempGroupArray = JSON.parse(localStorage.getItem('groups'));
                    tempGroupArray.push(JSON.stringify(data));
                    setuserGroups(tempGroupArray);
                    localStorage.setItem('groups', JSON.stringify(tempGroupArray))
                    let temp = JSON.parse(localStorage.getItem('user')).groups;
                    temp.push(randomID);
                    localStorage.setItem('user', JSON.stringify({nickname: nickname, username: username, groups: temp }))

                    //TODO: AND ADDING GROUPS ID INTO USER GROUP ID ARRAY
                    let tempIDArray = JSON.parse(localStorage.getItem('user')).groups.concat(groupID);
                    localStorage.setItem('user', JSON.stringify({nickname: nickname, username: username, groups: tempIDArray }))
                }
            }
            setshowAdd(false);
        }
    }

    let joinGroup = async () => {
        console.log(joinGroup);
        if(joinGroup !== ""){
            //tJNV8OldT0
            let docSnap = await getDoc(doc(db, "Groups", groupID));

            console.log(docSnap.data());
             if(docSnap.exists()){
                //add to the users group array
                await updateDoc(doc(db, "Users", username), {
                    groups: arrayUnion(groupID)
                });

                await updateDoc(doc(db, 'Groups', groupID ), {
                    users: arrayUnion(nickname)
                });

                //TODO: JOINING THE GROUPS USERS ARRAY (adding name to the users[])
                 const joinedGroup = {
                     name: docSnap.data().name,
                     transactions: docSnap.data().transactions,
                     users: docSnap.data().users.concat(nickname), //concat the nickname to the users array
                     groupID: groupID
                 };
                 let temp = JSON.parse(localStorage.getItem('groups'));
                 temp.push(JSON.stringify(joinedGroup));
                 localStorage.setItem('groups', JSON.stringify(temp));
                 console.log("JOINED")
                 setuserGroups(temp);

                 //TODO: AND ADDING GROUPS ID INTO USER GROUP ID ARRAY
                let tempIDArray = JSON.parse(localStorage.getItem('user')).groups.concat(groupID);
                localStorage.setItem('user', JSON.stringify({nickname: nickname, username: username, groups: tempIDArray }))

            }else{
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
        e.preventDefault();
        console.log("login status: ", {loginStatus})
        if(loginStatus === "Group does not exist."){
            setLoginStatus("Group does not exist.");
        }else{
            handleCloseJoin();
            setLoginStatus("");
        }

    }

    let showTransactions = (item) => {
        setselectedGroupName(JSON.parse(item).name);
        setselectedGroup(item);

        setshowTransaction(true);
    }

    return (
        <div id="background">
            
            {showTransaction && 
                <div>
                <span id="groupName" onClick={()=>{setshowTransaction(false)}}>&lt;- {selectedGroupName}</span>
                <Transactions info={selectedGroup}>

                </Transactions>
                </div>
            }

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
                
                {showAdd && <Row >
                    <Col style={{ textAlign: "center" }}>
                        <AddGroup id="add-group-svg" />
                    </Col>
                
                </Row>
                }
                <Container fluid="xs" >
                    <Row>
                    {userGroups.map(function(item,index){
                        let info = JSON.parse(item);
                        return <Col xs={6} key={index} onClick={()=>{showTransactions(item)}}>
                            <GroupPreview name={info.name} id={info.groupID}/>
                        </Col>
                    })}
                    </Row>
                </Container>
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
                <Modal.Header closeButton style={{ borderBottom: "0 none" }}>
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
                                        <Form.Text>{loginStatus}</Form.Text>
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