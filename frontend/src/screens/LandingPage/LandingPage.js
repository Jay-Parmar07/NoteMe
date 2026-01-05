import { Container, Row, Button } from 'react-bootstrap'
import "./LandingPage.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    //     useEffect(() => {
    //   const userInfo = localStorage.getItem("userInfo");

    //   if(userInfo){
    //     navigate("/mynotes");
    //   }
    // },[navigate]
    // );
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to NoteMe</h1>
                            <p className='subtitle'>One Safe Place for All your Notes...!</p>
                        </div>

                        <div className='buttonContainer'>
                            <a href="/login">
                                <Button size='lg' className="landingbutton" variant="dark">Login</Button>
                            </a>
                            <a href="/register">
                                <Button size='lg' className="landingbutton" variant="outline-dark">Register</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage

