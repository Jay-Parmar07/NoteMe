import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../actions/userActions';

const Header = ({ setSearch }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };


    return (
        <Navbar expand="lg" variant="dark" bg="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>

                    <Link to="/">NoteMe</Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search"
                            />
                            {/* <Button variant="outline-success">Search</Button> */}
                        </Form>
                    </Nav>

                    {userInfo ? (
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/mynotes">
                                My Notes
                            </Nav.Link>
                            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                            <NavDropdown title={userInfo.name} id="username">
                                <NavDropdown.Item as={Link} to='/profile'>
                                    My Profile
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>{" "}
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            {/* <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link> */}
                        </Nav>

                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
