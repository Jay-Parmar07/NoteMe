import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, updateNote } from '../../actions/notesActions';
import ReactMarkdown from 'react-markdown'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NOTES_UPDATE_RESET } from "../../constants/notesConstants";


function SingleNote({ }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error, success } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes")
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: NOTES_UPDATE_RESET });

      navigate("/mynotes");
    }
  }, [success, navigate, dispatch]);



  useEffect(() => {
    if (!userInfo || !userInfo.token) return;
    // navigate("/"); // redirect to login

    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes/${id}`, config);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, userInfo]
  );

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    dispatch(updateNote(id, title, content, category));

    // resetHandler();
    // navigate("/mynotes");

  };

  return (
    <MainScreen title="Update Note">
      <Card>
        <Card.Header>Edit a Note</Card.Header>
        <Card.Body>
          {/* <Form onSubmit={updateHandler}> */}
          <Form>
            {loadingDelete && <Loading />}
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button className="my-2"
              variant="primary" onClick={updateHandler}
            >
              Update Note
            </Button>

            <Button
              className="mx-2" onClick={() => deleteHandler(id)}
              variant="danger">
              Delete Note
            </Button>

          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date ? date.substring(0, 10) : "N/A"}
        </Card.Footer>

      </Card>
    </MainScreen>
  )
}

export default SingleNote
