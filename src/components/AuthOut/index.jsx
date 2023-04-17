import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase, createSwal } from '../AuthUI'
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const SignOut = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        handleSignOut();
    }, []);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
            createSwal(error.message, 'error');
        } else {
            setUser("");
            navigate('/');
            createSwal('Successful', 'success');
        }

    };



};

export default SignOut