import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    const history = useHistory();


    const { showAlert, setOpen } = props;

    const handleLogOut = () => {
        localStorage.removeItem('token');
        history.push("/login");
        showAlert("Successfully logged Out!", "success");
        setOpen(true);
    }
    return (
        <div style={{ height: "50px" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ zIndex: "1201" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {location.pathname !== "/" ? <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form> :
                            <div className="d-flex mx-2" id="navbarSupportedContent">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} aria-current="page" to="/profile">Profile</Link>
                                    </li>
                                </ul>
                                <div className="mx-2 mb-2 mb-lg-0">
                                    <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
