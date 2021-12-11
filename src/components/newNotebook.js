import React, { useState,useContext } from 'react'
import notesContext from '../Context/notes/notesContext'

const NewNotebook = (props) => {

    const context = useContext(notesContext);
    const { addNotebook } = context;

    const [notebookTitle, setNotebookTitle] = useState({
        title: "Untitled"
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setNotebookTitle({ ...notebookTitle, [name]: value });
    }

    const { refAdd,refAddClose,setEffect,effect} = props;

    const handleAddClick=()=>{
    refAddClose.current.click();
    addNotebook(notebookTitle.title); 
    setEffect(!effect);   
    }

    return (
        <div>
            <button type="button" ref={refAdd} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create New Notebook</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" value={notebookTitle.title} id="title" name="title" onChange={handleOnChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={handleAddClick}>Create</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refAddClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewNotebook
