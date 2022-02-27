import { React, useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Button, Col, Container, Row, Modal, Form, InputGroup, FormControl} from "react-bootstrap";

import { ReactComponent as SpenseLogo } from '../styles/graphics/spense.svg';
//database import
import db from "../database";
import {ReactComponent as Receipt} from "../styles/graphics/receipt_3.svg";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";

const Transactions = (props) => {

    const [show, setShow] = useState(false);
    //const [transactions, setTransactions] = useState(props.info.transactions);
    const [members, setMembers] = useState([]);
    const [loopableMembers, setloopableMembers] = useState(props.info.users);
    //if split equal is false, then you do manual, if it's true, you split equal
    const [payment, setPayment] = useState('Split Payment');
    const [amount, setAmount] = useState(0.00);
    const [expenseTitle, setexpenseTitle] = useState('')


    useEffect( () => {

    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let addTransactions = async () => {
        console.log("props.info.groupID", props.info.groupID)
        const documentRef = doc(db, 'Groups', props.info.groupID);
        const document = await getDoc(documentRef);

        if(document.exists()){
            //TODO: grab from local storage to find out who the receiver is
            let temp = [];
            const tempAmount = amount / (members.length+1);
            console.log('tempAmount',tempAmount)
            for(let i = 0; i < members.length; i++ ){
                //temp.push({amount: tempAmount, expenseTitle: expenseTitle, receiver: props.info.user, sender: members[i]})
                let tempMap = new Map();
                tempMap.set('amount', tempAmount);
                tempMap.set('expenseTitle', expenseTitle);
                tempMap.set('receiver', props.info.user);
                tempMap.set('sender', members[i]);

                // receiver is the person who owns it
                await updateDoc( doc(db, "Groups", props.info.groupID), {
                    transactions: arrayUnion({amount: tempAmount, expenseTitle: expenseTitle, receiver: props.user, sender: members[i].toString()})
                });
                let groupsTempArray = [];
                for(let j = 0; j < JSON.parse(localStorage.getItem('groups')).length ; j++){
                    if( JSON.parse(JSON.parse(localStorage.getItem('groups'))[j]).groupID === props.info.groupID ){
                        let transArr = JSON.parse(JSON.parse(localStorage.getItem('groups'))[j]).transactions;
                        transArr.push({amount: tempAmount, expenseTitle: expenseTitle, receiver: props.user, sender: members[i].toString()});
                        groupsTempArray.push(JSON.stringify({groupID: props.info.groupID, name: props.info.name, users: props.info.users, transactions: transArr }))
                    }else{
                        groupsTempArray.push(JSON.parse(localStorage.getItem('groups'))[j])
                    }
                }
                localStorage.setItem('groups', JSON.stringify(groupsTempArray));
            }

        }
    }

    let handleSubmit = e => {
        e.preventDefault();
        console.log(amount);
        console.log(members.length)
        addTransactions();
        handleClose();
        setAmount(0.00);
        setPayment('Split Payment');
        setMembers([]);
        setexpenseTitle('');
    }

    let handleInputChange = (e) => {
        const target = e.target;

        if(target.checked){

            members.push(target.name);
            setMembers(members);

        }else{

            let temp = members;
            temp = temp.filter(e => e !== target.name);
            setMembers(temp);
        }

    }

    let togglePayments = (e) => {
        setPayment(e.target.name)
    }

    return (
        <Container>
            <Button onClick={handleShow}>
                Value
            </Button>
            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton style={{ borderBottom: "0 none" }}>
                    <Modal.Title className="modal-title">Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col xs={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Label>Expense Title</Form.Label>
                                    <Form.Control
                                        type="username"
                                        placeholder="ex: Utilities"
                                        onChange={(e) => setexpenseTitle(e.target.value)}
                                        value={expenseTitle}
                                        required
                                    />

                                    <Form.Label>Dollar Amount</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            type="number"
                                            min="0.00"
                                            step="0.01"
                                            placeholder="ex: 123.38"
                                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                                            value={amount}
                                            required
                                            aria-label="Amount (to the nearest dollar)" />
                                    </InputGroup>
                                    Group Members:
                                    {loopableMembers.map((user) => (
                                        user !== props.user ?
                                        <div key={ user } className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                id={`default-${user}`}
                                                label={`${user}`}
                                                name={`${user}`}
                                                onChange={handleInputChange}
                                            />
                                        </div> : <div key=""></div>
                                    ))}
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id={`split`}
                                        label={`Split Payment`}
                                        name={`Split Payment`}
                                        checked={payment === "Split Payment"}
                                        onChange={togglePayments}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id={`manual`}
                                        label={`Manual Payment`}
                                        name={`Manual Payment`}
                                        checked={payment === "Manual Payment"}
                                        onChange={togglePayments}
                                    />
                                    {['Split Equally', 'Manually'].map((choice) => (
                                        <div key={ choice } className="mb-3">

                                        </div>
                                    ))}
                                    <br/>
                                    <br/>

                                    <Button  type="submit" className="new-group-submit-btn" >
                                        Add Expense
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
        </Container>
    );
}

export default Transactions;