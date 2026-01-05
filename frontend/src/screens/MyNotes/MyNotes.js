import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
// import notes from "../../data/notes";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({ search }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };


  // console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete]
  );

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name}...!`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6, marginLeft: 10 }} size='lg'>
          Create New Note
        </Button>
      </Link>

      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading />}

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {
        notes?.slice().reverse().filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
            <Accordion key={note._id} style={{ margin: 10 }}>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>{note.title}</Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <h4>
                      <Badge bg="success"> Category - {note.category}</Badge>
                    </h4>
                    <div>
                      <Button as={Link} to={`/note/${note._id}`}>Edit</Button>
                      <Button
                        variant='danger'
                        className='mx-2'
                        onClick={() => deleteHandler(note._id)}
                      >Delete</Button>
                    </div>
                  </div>

                  <blockquote className="blockquote mb-0"
                  // style={{ marginTop: 10 }}
                  >
                    <p>
                      {note.content}
                    </p>
                    <footer className="blockquote-footer">
                      Created on {" "}
                      <cite title='Source Title'>
                        {note.createdAt?.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
          )
      }

    </MainScreen>

  )
}

export default MyNotes
