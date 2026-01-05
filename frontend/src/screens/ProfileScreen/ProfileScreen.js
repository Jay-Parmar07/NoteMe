import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Col, Row, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';

const ProfileScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pictureMessage, setPictureMessage] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPicture(userInfo.picture);
        }
    }, [navigate, userInfo])


    const postDetails = (picture) => {
        if (!picture) {
            return setPictureMessage("Please Select an Image");
        }
        setPictureMessage(null);

        if (picture.type === "image/jpeg" || picture.type === "image/png") {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "NoteMe");
            data.append("cloud_name", "jayparmar");
            fetch("https://api.cloudinary.com/v1_1/jayparmar/image/upload",
                {
                    method: "post",
                    body: data,
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPicture(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPictureMessage("Please Select an Image of Correct format");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === confirmPassword)
            dispatch(updateProfile({ name, email, password, picture }));
    }


    return (
        <MainScreen title="EDIT PROFILE 🙈">
            <div>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}

                            {success && <ErrorMessage variant='success'>Updated Successfully</ErrorMessage>}

                            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    value={name}
                                    placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>{" "}

                            {pictureMessage && (
                                <ErrorMessage variant="danger">{pictureMessage}</ErrorMessage>
                            )}

                            <Form.Group controlId="picture">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    id="custom-file"
                                    type="file"
                                    label="Upload Profile Picture"
                                    custom
                                />
                            </Form.Group>
                            <Button className='my-2' variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "Center",
                            justifyContent: "Center",
                        }}>
                        <img
                            src={picture}
                            alt={name}

                        />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
