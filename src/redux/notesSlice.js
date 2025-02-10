import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (userId, { getState }) => {
    const state = getState();  // This gives you access to the entire Redux store state
    const accessToken = state.auth.token;  // Access the `accessToken` from the `auth` slice of the store

    const response = await axios.get(`/api/notes/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
});

export const createNote = createAsyncThunk("notes/createNote", async (noteData, { getState }) => {
    const state = getState();
    const accessToken = state.auth.token;

    const response = await axios.post("/api/notes", noteData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId, { getState }) => {
    const state = getState();
    const accessToken = state.auth.token;
    await axios.delete(`/api/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return noteId;
});

export const summarizeNote = createAsyncThunk("notes/summarizeNote", async (content, { getState }) => {
    const state = getState();
    const accessToken = state.auth.token;
    const response = await axios.post("/api/notes/summarize", { content }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.summary;
});

export const updateNotePosition = createAsyncThunk("notes/updatePosition", async ({ id, position }, { getState }) => {
    const state = getState();
    const accessToken = state.auth.token;
    const response = await axios.put(`/api/notes/${id}`, { position }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
});

const notesSlice = createSlice({
    name: "notes",
    initialState: { notes: [], summary: "" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action) => { state.notes = action.payload; })
            .addCase(createNote.fulfilled, (state, action) => { state.notes.push(action.payload); })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload);
            })
            .addCase(summarizeNote.fulfilled, (state, action) => { state.summary = action.payload; })
            .addCase(updateNotePosition.fulfilled, (state, action) => {
                const index = state.notes.findIndex(n => n._id === action.payload._id);
                if (index !== -1) {
                    state.notes[index].position = action.payload.position;
                }
            });;
    }
});

export default notesSlice.reducer;