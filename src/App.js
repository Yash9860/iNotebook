
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/login';
import Signup from './components/signup';


// {
//   "email": "yash12345@gamil.com",
//   "password":"yashk0987"
// }

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <Router>
        <NoteState>

          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/Login' element={<Login showAlert={showAlert} />}></Route>
              <Route exact path='/Signup' element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>


        </NoteState>
      </Router>
    </>
  );
}

export default App;
