import * as React from 'react';
import { useEffect, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import notesContext from '../Context/notes/notesContext'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewNotebook from "./newNotebook";
import DeleteModal from './DeleteModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const drawerWidth = 300;

export default function ClippedDrawer(props) {

    const context = useContext(notesContext);
    const { notebooks, getNotebooks, getNotes, deleteNotebook, editNotebook, defaultnotebooks, getDefaultNotebooks, setClicked, clicked, setClickedNotebooks } = context;
    const [noteId, setNoteId] = useState("");
    const refAdd = useRef(null);
    const refAddClose = useRef(null);
    const refDelete = useRef(null);
    const refDeleteClose = useRef(null);
    const [effect, setEffect] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [editTitle, setEditTitle] = useState({
        etitle: "",
    });

    const { showAlert, setOpen } = props;

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotebooks()
            getDefaultNotebooks()
        } else {
            history.push('/login');
            showAlert("Login to access your notes!", "error");
            setOpen(true);
        }
        // eslint-disable-next-line
    }, [effect]);

    const handleOnClick = () => {
        refAdd.current.click();
    }

    const handleOnDeleteIconClick = (noteId) => {
        setNoteId(noteId);
        refDelete.current.click();
    }

    const deleteButtonClick = () => {
        refDeleteClose.current.click();
        deleteNotebook(noteId);
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setEditTitle({ ...editTitle, [name]: value });
    }

    const handleEditClick = () => {
        setShowInput(!showInput);
    }

    const handleSubmit = (id) => {
        setShowInput(!showInput);
        editNotebook(id, editTitle.etitle);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {defaultnotebooks.map((defaultnotebook) => {
                            return (
                                <ListItem button key={defaultnotebook._id} onClick={() => { getNotes(defaultnotebook._id); setClicked(!clicked); setClickedNotebooks([]) }}>
                                    <ListItemIcon>
                                        <ListIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={defaultnotebook.title} />
                                </ListItem>)
                        })}
                    </List>
                    <Divider />
                    <List>
                        {notebooks.map((notebook) => {
                            return (
                                <ListItem button key={notebook._id} onClick={() => { getNotes(notebook._id); setClicked(!clicked) }}>
                                    <ListItemIcon >
                                        <ListIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    {!showInput ? <ListItemText primary={notebook.title} /> :
                                        <input type="text" className="form-control" defaultValue={notebook.title} id="etitle" name="etitle" onChange={handleOnChange} />}
                                    {!showInput ? <IconButton aria-label="edit" size="large" onClick={handleEditClick}>
                                        <EditIcon />
                                    </IconButton> :
                                        <IconButton aria-label="edit" size="large" onClick={() => { handleSubmit(notebook._id) }}>
                                            <CheckIcon sx={{ color: 'green' }} />
                                        </IconButton>}
                                    <IconButton aria-label="delete" size="large" onClick={() => { handleOnDeleteIconClick(notebook._id) }}>
                                        <DeleteIcon sx={{ color: "blue" }} />
                                    </IconButton>
                                </ListItem>)
                        })}
                    </List>
                </Box>
                <div style={{ marginLeft: "70%" }} >
                    <Fab color="primary" aria-label="add" onClick={handleOnClick}>
                        <AddIcon />
                    </Fab>
                </div>
            </Drawer>
            <NewNotebook refAdd={refAdd} refAddClose={refAddClose} effect={effect} setEffect={setEffect} />
            <DeleteModal refDelete={refDelete} refDeleteClose={refDeleteClose} deleteButtonClick={deleteButtonClick} />
        </Box>
    );
}
