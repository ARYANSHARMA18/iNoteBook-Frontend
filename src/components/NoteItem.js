import React, { useContext } from 'react'
import notesContext from '../Context/notes/notesContext'
const NoteItem = (props) => {
    const context = useContext(notesContext);
    const { deleteNote } = context
    const { note, updateNote, showAlert } = props
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ backgroundColor: "Ccorn", boxShadow: "-3px 3px 26px -6px rgba(0,0,0,0.75)", opacity: "0.85" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ cursor: "pointer", marginRight: '25%' }} />
                    <i className="far fa-trash-alt" onClick={() => { deleteNote(note._id); showAlert("Note Deleted Successfully ", "success"); }}></i>
                    <i className="fas fa-edit mx-5" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
