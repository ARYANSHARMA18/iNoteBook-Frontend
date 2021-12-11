import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });

    const history = useHistory();

    const {showAlert,setOpen}=props;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (response.status === 200) {
            showAlert(json.msg,"success");
            setOpen(true)
            localStorage.setItem('token', json.authtoken);
            history.push("/login");
        } else {
            showAlert(json.error,"error");
            setOpen(true)
        }
    }
    return (
        <div className="container mt-4">
        <h2>Register To use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleOnChange} required placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp" required placeholder="Email Address"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleOnChange} name="password" required placeholder="Password" minLength={5} autoComplete="on"/>
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={handleOnChange} name="cpassword" required placeholder="Confirm Password" minLength={5}/>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
