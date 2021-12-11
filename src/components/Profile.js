import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        date: ""
    })

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const host = "https://my-e-notebook.herokuapp.com";

    const getData = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();

        setProfile({ name: json.name, email: json.email, date: json.date });
    }
    console.log(profile);

    return (
        <div className="container">
        <h2 className="mb-3">User Profile</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input disabled type="text" className="form-control" id="name" name="name" defaultValue={profile.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input disabled type="email" className="form-control" id="email" name="email" defaultValue={profile.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date of Register</label>
                    <input disabled type="text" className="form-control" id="date" name="date" defaultValue={profile.date} />
                </div>
            </form>

        </div>
    )
}

export default Profile
