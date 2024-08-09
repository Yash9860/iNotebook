import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router'
const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNote ,editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
            navigate("/login");
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const [selectedNote, setSelectedNote] = useState(null);
    const modalRef = useRef(null);
    const closeref = useRef(null);
    const [note, setNote] = useState({id:"", title: "", description: "", tag: "" });
    const handleUpdateNote = (currentNote) => {
        
        modalRef.current.click();
        setNote({id: currentNote._id ,title :currentNote.title,description : currentNote.description,tag:currentNote.tag})
        
        
    };
    

    const handleUpdateClick = (e) => {
        console.log("updating")
        editNote(note.id,note.title,note.description,note.tag )
        closeref.current.click();
        props.showAlert(" Updated Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button ref={modalRef} type='button' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5}
                                    required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5}
                                    required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}
                                    required />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleAddClick}>Add note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length<5 || note.description.length<5} onClick={handleUpdateClick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h4>Your note</h4>
                {notes.length === 0 && <div className = "container">'No notes to display'</div>}
                {notes.map((note) => {
                    return <Noteitem key={note._id} onUpdateNote={handleUpdateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes