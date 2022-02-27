import '../styles/homepage.scss';
import { ReactComponent as Logo } from '../styles/graphics/spense.svg';
import { ReactComponent as LandingGraphic } from '../styles/graphics/landing_graphic.svg';
import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    let navigate = useNavigate();

    let login = () => {
        navigate('/login');
    }

    let register = () => {
        navigate('/register');
    }

    return (
        <div id="background">
            <Logo id="logo"></Logo>

            <Container fluid="md" id="main">
                <Row>
                    <Col md={6} id="info">
                        <span id="headline">Leave the Stress to <span id="spense-text">Spense</span></span>
                        <p></p>
                        <span id="tagline">Split and track expenses<br />with your friends. </span>
                        <br/><br/>
                        <p>
                            <button id="login" onClick={login}>Log In</button>
                            <button id="register" onClick={register}>Register</button>
                        </p>
                    </Col>
                    <Col md={6}><LandingGraphic id="graphic"/></Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage; 