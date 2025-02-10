import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import notesReducer from "./notesSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    notes: notesReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "notes"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);