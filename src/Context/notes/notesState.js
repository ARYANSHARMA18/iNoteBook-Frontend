import React, { useState } from 'react';
import NotesContext from './notesContext';

const NotesState = (props) => {
    const host = "https://my-e-notebook.herokuapp.com";
    const intialNote = []

    const [notes, setNotes] = useState(intialNote);
    const [notebookId, setNotebookId] = useState("61b0987929314dab0b03aa04");

    //GET a Note
    const getNotes = async (id) => {
        //API Call
        if (id === undefined) {
            const response = await fetch(`${host}/api/notes/fetchallnotes/61b0987929314dab0b03aa04`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json();
            setNotes(json.foundNotes);
        } else {
            setNotebookId(id);
            const response = await fetch(`${host}/api/notes/fetchallnotes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json();
            setNotes(json.foundNotes);
        }
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, notebookId })
        });
        const note = await response.json();
        setNotes(notes.concat(note.savednotes));
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        await response.json();
        setNotes(notes.filter((note) => { return note._id !== id }));
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();
        //Edit Client-side logic
        const newNote = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }

    const intialNotebooks = []
    const [notebooks, setNotebooks] = useState(intialNotebooks);

    //GET a Notebook
    const getNotebooks = async () => {

        //API Call
        const response = await fetch(`${host}/api/notebooks/fetchallnotebooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotebooks(json.foundNotebooks);
    }

    //Add a Notebook
    const addNotebook = async (title) => {
        if (title === "") {
            title = "Untitled"
        }
        //API Call
        const response = await fetch(`${host}/api/notebooks/addnotebook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title })
        });
        await response.json();
        // setNotebooks(notebooks.concat(notebook.foundNotebooks));
    }

    //Delete a Noteboook
    const deleteNotebook = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notebooks/deletenotebook/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        await response.json();
        setNotebooks(notebooks.filter((notebook) => { return notebook._id !== id }));
    }

    //Edit a Notebook
    const editNotebook = async (id, title) => {
        //API Call
        const response = await fetch(`${host}/api/notebooks/updatenotebook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title })
        });
        await response.json();

        //Edit Client-side logic
        const newNotebook = JSON.parse(JSON.stringify(notebooks));
        for (let index = 0; index < newNotebook.length; index++) {
            const element = newNotebook[index];
            if (element._id === id) {
                if (title === "") {
                    newNotebook[index].title = newNotebook[index].title;
                    /*eslint no-self-assign: ["error", {"props": false}]*/
                } else {
                    newNotebook[index].title = title;
                }
                break;
            }
        }
        setNotebooks(newNotebook);
    }

    const intialDefaultNotebooks = []
    const [defaultnotebooks, setDefaultNotebooks] = useState(intialDefaultNotebooks);

    //GET a Notebook
    const getDefaultNotebooks = async () => {

        //API Call
        const response = await fetch(`${host}/api/defaultnotebooks/fetchdefaultnotebooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setDefaultNotebooks(json.foundDefaultNotebooks);
    }

    const intialClickedNotebooks = []
    const [clickednotebooks, setClickedNotebooks] = useState(intialClickedNotebooks);
    const intialClickedDefaultNotebooks = []
    const [clickeddefaultnotebooks, setClickedDefaultNotebooks] = useState(intialClickedDefaultNotebooks);
    const [clicked, setClicked] = useState(false);

    // GET a Notebook
    const getClickedNotebooks = async () => {
        //API Call
        const response = await fetch(`${host}/api/notebooks/fetchallnotebooks/${notebookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setClickedNotebooks(json.foundNotebooks);
    }

    // GET a Notebook
    const getClickedDefaultNotebooks = async () => {
        //API Call
        const response = await fetch(`${host}/api/defaultnotebooks/fetchdefaultnotebooks/${notebookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setClickedDefaultNotebooks(json.foundDefaultNotebooks);
    }

    return <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, notebooks, getNotebooks, addNotebook, deleteNotebook, editNotebook, defaultnotebooks, getDefaultNotebooks, clickednotebooks, getClickedNotebooks, clicked, setClicked, getClickedDefaultNotebooks, clickeddefaultnotebooks, setClickedNotebooks }}>
        {props.children}
    </NotesContext.Provider>
}

export default NotesState;