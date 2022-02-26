
//react stuff
import {React, useEffect, useState} from 'react';
//firestore stuff
import { getDocs, doc, getDoc, addDoc, collection } from "firebase/firestore";
//graphics stuff
import { ReactComponent as SpenseLogo } from '../styles/graphics/spense.svg';
import { ReactComponent as AddGroup } from "../styles/graphics/add_new_group.svg";
//scss files
import '../styles/Dashboard.scss';
import {Button, Col, Container, Row} from "react-bootstrap";
//database import
import db from "../database";

const Dashboard = (props) => {

    const [Username, setUsername] = useState("");
    const [Nickname, setNickname] = useState("");
    
    useEffect( () => {
        username();
    })

    let username = async () => {
        const docRef = doc(db, "Users", "jamestv@uci.edu");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setNickname(docSnap.data().Nickname);
            setUsername(docSnap.data().Username);
            return docSnap.data();
        }
    }

    return(
        <Container>
            <Row>
                <Col sm={9}>
                    <SpenseLogo id="logo" />
                </Col>
                <Col sm={3} className="topNav-dashboard">
                    <Button>
                        New Group +
                    </Button>
                    <Button>
                        Join Group
                    </Button>
                </Col>
            </Row>
            <Row id="welcome-text">
                Welcome Back, { Nickname }!
            </Row>
            <Row>
                <AddGroup />
            </Row>
        </Container>
    );
}

export default Dashboard;