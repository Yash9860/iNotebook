import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token 
            console.log('Auth Token:', json.token);
            localStorage.setItem('token', json.token)
            props.showAlert("Success")
            navigate("/");
        }
        else {
            // alert("invalid credentials")
            props.showAlert(" Invalid details","danger")
        }
    }
    return (
        <div className="container my-5">
            <h2>Login to iNoteboook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login