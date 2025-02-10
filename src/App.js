import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Containers/Auth.js";
import Notes from "./Containers/Notes.js";
import PrivateRoute from "./Components/PrivateRoute.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth type="login" />} />
                <Route path="/register" element={<PrivateRoute><Auth type="register" /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute><Notes /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
