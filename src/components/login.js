import { ReactComponent as Logo } from '../styles/graphics/spense.svg';
// import { ReactComponent as LoginGraphic } from '../styles/graphics/login.svg';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

import Lottie from 'lottie-react';
import animate from '../styles/graphics/Chatbot.json';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import db from '../database'

import '../styles/login.scss';

const Login = () => {

    const defaultOptions = {
        animationData: animate,
        loop: true,
        autoplay: true,
    };


    let navigate = useNavigate();

    let register = () => {
        navigate('/register');
    }

    let homePage = () => {
        navigate('/');
    }

    let dashboard= () => {
        navigate('/dashboard');
    }

    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    let authenticateUser = async () => {
        const docRef = doc(db, "Users", username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data().Nickname);
            console.log(" exists!");
            console.log("Exists: ", docSnap.data());
            // return docSnap.data();

            localStorage.setItem("user", JSON.stringify(docSnap.data()));
            
            const querySnapshot = await getDocs(collection(db, "Groups"));
            var groupArray = [];
            querySnapshot.forEach( (doc) => {
                for(var i = 0 ; i < JSON.parse(localStorage.getItem("user")).groups.length ; i++){
                    if(doc.id === JSON.parse(localStorage.getItem("user")).groups[i]){
                        groupArray.push(JSON.stringify(doc.data()));
                    }
                }
            });
            //console.log("json stringify:", JSON.stringify(groupArray));
            localStorage.setItem("groups", JSON.stringify(groupArray));
            //console.log(JSON.parse(localStorage.getItem("user")).groups);

            setLoginStatus("");
            dashboard();
        } else {
            setLoginStatus("User Doesn't Exist");
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Your state values: \n 
                username: ${username}
                `);
        
        authenticateUser();
        // console.log(JSON.parse(localStorage.getItem("Data")));
        setUsername("");
    };

    return (
        <div id="background">
            <Logo id="logo" onClick={homePage}></Logo>

            <Container fluid="md" id="main">
                <Row>
                    <Col md={6} >
                        <div id="login-form-container">
                            <p id="welcome-back">Welcome Back</p>
                            <Form id="login-form" onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="usernameInput">
                                    <Form.Label id="username">Username</Form.Label>
                                    <Form.Control
                                        name="username"
                                        type="text"
                                        onChange={(e)=>setUsername(e.target.value)}
                                        value={username}
                                    />
                                    <Form.Text style={{color: "red"}}>{loginStatus}</Form.Text>
                                </Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Button variant="primary" type="submit" id="loginPage-login">Log In</Button>
                            </Form>
                        </div>
                        <br></br>
                        <div id="create-account" onClick={register}>Create an Account</div>
                    </Col>
                    <Col md={6}><Lottie id="animation" animationData={animate} loop={true}></Lottie></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;