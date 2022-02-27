import { ReactComponent as Logo } from '../styles/graphics/spense.svg';
// import { ReactComponent as LoginGraphic } from '../styles/graphics/login.svg';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import Lottie from 'lottie-react';
import animate from '../styles/graphics/Chatbot.json';

import '../styles/login.scss';

import { collection, setDoc, doc } from "firebase/firestore";
import db from '../database.js'

const Register = () => {

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [groups, setGroups] = useState([]);

    let navigate = useNavigate();

    let login = () => {
        navigate('/login');
    }

    let homePage = () => {
        navigate('/');
    }

    const defaultOptions = {
        animationData: animate,
        loop: true,
        autoplay: true,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Your state values: \n 
                username: ${username} \n 
                nickname: ${nickname} \n
                groups: ${groups}
        `);
        const usersRef = collection(db, "Users");
        
        setDoc(doc(usersRef, username), {
            username: username,
            nickname: nickname,
            groups: groups
        });

        // addDoc(collection(db, "Users", ), {
        //     name: username,
        //     nickname: nickname,
        //     groups: groups
        // });
        setUsername("");
        setNickname("");
    };

    return (
        <div id="background">
            <Logo id="logo" onClick={homePage}></Logo>

            <Container fluid="md" id="main">
                <Row>
                    <Col md={6} >
                        <div id="login-form-container">
                            <p id="welcome-back">Welcome</p>
                            <Form id="login-form" onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="usernameInput">
                                    <Form.Label id="username">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="usernameInput">
                                    <Form.Label id="username">Nickname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e)=> setNickname(e.target.value)}
                                        value={nickname}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" id="loginPage-login">Register</Button>
                            </Form>
                        </div>
                        <br></br>
                        <div id="create-account" onClick={login}>Sign In</div>
                    </Col>
                    <Col md={6}><Lottie id="animation" animationData={animate} loop={true}></Lottie></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;