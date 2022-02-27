
//react stuff
import { React, useEffect, useState } from 'react';
//scss files
import '../styles/Transactions.scss';
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";

import TransactionPreview from './TransactionPreview';


const Transactions = (props) => {
    const [name, setName] = useState(JSON.parse(props.info).name);
    const [transactions, setTransactions] = useState(JSON.parse(props.info).transactions);

    return (
        <div id="background-tr">

            <Container fluid id="dashboard" >
                <Row>
                    {/* <Col><span id="welcome-text">&lt;- {name}</span></Col> */}
                    <Col >
                        <Button id="join-group-btn" >Add Expense</Button>
                    </Col>
                </Row>
                <br></br>
                <Container fluid="xs" >
                    <Row>
                        {transactions.map(function (item, index) {

                            console.log(item);

                            return <Col key={index} xs={6}>
                                <TransactionPreview receiver={item.receiver} sender={item.sender} amount={item.amount} title={item.expenseTitle}></TransactionPreview>
                            </Col>
                        })}
                    </Row>
                </Container>
            </Container>
        </div>
    )

}

export default Transactions;