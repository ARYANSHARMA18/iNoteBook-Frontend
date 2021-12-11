import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import notesContext from '../Context/notes/notesContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import "./Notes.css";

export const Notes = (props) => {
    const context = useContext(notesContext);
    const { notes, getNotes, editNote } = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const history = useHistory();

    const { showAlert, setOpen } = props;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            history.push('/login');
            showAlert("Login to access your notes!", "error");
            setOpen(true);
        }

        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({
        etitle: "",
        edescription: "",
        etag: "Default",
        id: ""
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }

    const handleClick = () => {
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        showAlert("Note Successfully Edited", "success");
        setOpen(true)
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, id: currentNote._id });
    }

    // const updateComplete = (note) => {
    //     if (!complete.includes(note)) {
    //         setComplete(prevArray => [...prevArray, note]);
    //     }
    // }
    // console.log(complete)

    return (
        <>
            <div style={{ width: "100%" }}>
                <AddNote showAlert={showAlert} setOpen={setOpen} />
                {/* <DeleteModal refDelete={refDelete} handledeleteClick={handledeleteClick} refDeleteClose={refDeleteClose} /> */}
                <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "2.5%" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Edit Note</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={handleOnChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={handleOnChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={handleOnChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <h1>Your Notes</h1>
                    <div className="container my-2 mx-2">
                        {notes.length === 0 && "Not Note to display."}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
                    })}
                    {/* <div className="row my-3">
                        <h1>Completed</h1>
                            {complete.length > 0 &&
                                complete.map((note) => {
                                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} updateComplete={updateComplete} />
                                })
                            }
                    </div> */}
                </div>
            </div>
        </>
    )
}
