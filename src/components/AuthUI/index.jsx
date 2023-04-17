import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const supabaseUrl = 'https://vhzlcekkujwnouokptib.supabase.co'
const supabaseKey = `${import.meta.env.VITE_SUPABASE_KEY}`
export const supabase = createClient(supabaseUrl, supabaseKey)
const MySwal = withReactContent(Swal)


export const createSwal = (title, icon) => {
    return MySwal.fire({
        html: <strong>{title}</strong>,
        showConfirmButton: false,
        timer: 2000,
        icon: icon
      })
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                throw error;
            }
            console.log(email);
            setUser(email);
            createSwal('Welcome', 'success');
            navigate('/');
        } catch (error) {
            createSwal(error.message, 'error');
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error) {
                throw error;
            }
            console.log(user);
            createSwal('Check your email for verification', 'success');
            navigate('/');
        } catch (error) {
            createSwal(error.message, 'error');
        }
    };


    const inputStyle = {
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box",
        fontSize: "16px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#2196F3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "10px",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    };

    return (
        <form style={formStyle}>
            <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit} style={buttonStyle}>
                Login
            </button>
            <button type="submit" onClick={handleRegister} style={buttonStyle}>
                Register
            </button>
        </form>
    );
}
export default LoginPage;