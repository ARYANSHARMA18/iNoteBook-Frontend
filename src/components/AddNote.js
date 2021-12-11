import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import notesContext from '../Context/notes/notesContext'

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote, clickednotebooks, getClickedNotebooks, clicked, getClickedDefaultNotebooks, clickeddefaultnotebooks } = context;
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "Default"
    });

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getClickedNotebooks()
            getClickedDefaultNotebooks()
        } else {
            history.push('/login');
            showAlert("Login to access your notes!", "error");
            setOpen(true);
        }
        // eslint-disable-next-line
    }, [clicked]);

    const { showAlert, setOpen } = props;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Note Successfully Added", "success");
    }

    return (
        <div className="container my-3">
            {clickednotebooks.length > 0 ? clickednotebooks.map((notebook) => {
                return <h1 key={notebook._id} className="my-5">{notebook.title}</h1>
            }) : clickeddefaultnotebooks.map((notebook) => {
                return <h1 key={notebook._id} className="my-5">{notebook.title}</h1>
            })}
            <h1>Add Notes</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
            </form>
        </div >
    )
}

export default AddNote
