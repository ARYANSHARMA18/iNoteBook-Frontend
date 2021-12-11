import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NotesState from './Context/notes/notesState';
import DescriptionAlert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Profile from './components/Profile';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <NotesState>
        <Router>
          <Navbar showAlert={showAlert} setOpen={setOpen} />
          <DescriptionAlert alert={alert} open={open} setOpen={setOpen} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} setOpen={setOpen} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} setOpen={setOpen} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} setOpen={setOpen} />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
