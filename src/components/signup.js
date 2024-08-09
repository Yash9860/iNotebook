import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:"" , email: "", password: "",cpassword: ""  })
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token 
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Account created successfully","success")
            navigate("/");
        }
        else {
            // alert("Email already exists. Please use different email")
            props.showAlert("Email already exists. Please use different email","danger")
        }
    }
    return (
        <div className='container'>
            <h2 className='my-3'>Signup to iNoteboook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup