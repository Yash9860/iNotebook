import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const { note, onUpdateNote, showAlert } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    // const {} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i
                            className="fa-regular fa-trash-can mx-2"
                            onClick={() => {
                                deleteNote(note._id);
                                if (showAlert) {
                                    showAlert("Deleted Successfully", "success"); // Ensure showAlert is called correctly
                                }
                            }}
                        ></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { onUpdateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
