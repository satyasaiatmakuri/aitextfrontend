import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ type }) => {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "login") {
            await dispatch(loginUser({ email: form.email, password: form.password }));
        } else {
            await dispatch(registerUser(form));
        }
        navigate("/");
    };

    return (
        <div>
            <h2>{type === "login" ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                {type === "register" && <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />}
                <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">{type === "login" ? "Login" : "Register"}</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Auth;
