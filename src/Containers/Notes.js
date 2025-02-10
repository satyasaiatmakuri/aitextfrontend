import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote, deleteNote, summarizeNote } from "../redux/notesSlice";
import ReactFlowComponent from "../Components/ReactFlowComponent";

const Notes = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user.id);
    const notes = useSelector(state => state.notes.notes);
    const [newNote, setNewNote] = useState({ title: "", content: "" });

    useEffect(() => {
        dispatch(fetchNotes(userId));  // Replace with actual user ID
    }, [dispatch]);

    const handleCreate = () => {
        dispatch(createNote({ ...newNote, userId: userId }));
        setNewNote({ title: "", content: "" });
    };

    return (
        <div>
            <h2>Notes</h2>
            <input type="text" placeholder="Title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
            <textarea placeholder="Content" value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}></textarea>
            <button onClick={handleCreate}>Create Note</button>

            <div>
                {notes.map(note => (
                    <div key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => dispatch(deleteNote(note._id))}>Delete</button>
                        <button onClick={() => dispatch(summarizeNote(note.content))}>Summarize</button>
                    </div>
                ))}
            </div>

            <ReactFlowComponent notes={notes} />
        </div>
    );
};

export default Notes;
