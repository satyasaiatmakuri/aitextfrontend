import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateNotePosition, deleteNote, summarizeNote } from "../redux/notesSlice";

const DraggableNote = ({ note }) => {
    const dispatch = useDispatch();

    // Drag Functionality
    const [, dragRef] = useDrag({
        type: "NOTE",
        item: { id: note._id, position: note.position },
    });

    // Drop Functionality
    const [, dropRef] = useDrop({
        accept: "NOTE",
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            if (!delta) return;

            const newPosition = {
                x: Math.round(item.position.x + delta.x),
                y: Math.round(item.position.y + delta.y),
            };

            dispatch(updateNotePosition({ id: item.id, position: newPosition }));
        },
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            style={{
                position: "absolute",
                left: note.position?.x || 100,
                top: note.position?.y || 100,
                padding: "10px",
                backgroundColor: "white",
                border: "1px solid gray",
                cursor: "grab",
                width: "200px",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            }}
        >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => dispatch(deleteNote(note._id))}>Delete</button>
            <button onClick={() => dispatch(summarizeNote(note.content))}>Summarize</button>
        </div>
    );
};

export default DraggableNote;
