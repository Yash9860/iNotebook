  import React, { useState } from "react";
  import NoteContext from "./noteContext";
  import { useNavigate } from "react-router-dom";

  const NoteState = (props) => {
    const host = 'http://localhost:3001';
    const notesInitial = []
    let navigate = useNavigate();
    const [notes, setNotes] = useState(notesInitial)
    //get all notes
    const getNote = async () => {
      // to do api call
      
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem('token'),

        },
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const json = await response.json();
      setNotes(json);
    }
  //add note

  const addNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/savenotes`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    setNotes(notes.concat(json))
  }
  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),

      },
    });
    const json = response.json();
    // console.log(json);
    // console.log("deleting is working with" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //edit node

  const editNote = async (id, title, description, tag) => {

    //API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes)
  }



  return (

    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;