'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorTextPass, setErrorTextPass] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorTextConPass, setErrorTextConPass] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const routes = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        var token;
        try {
            const response = await axios.post('http://localhost:3001/gettoken', { username, password });
            const token = response.data.accessToken;
            // Perform registration process
            await axios.get('http://localhost:3001/post', {
                params: { username:username, password:password },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setAlertMessage('Registration successful');
            setIsError(false);
        } catch (error) {
            setAlertMessage('Error registering: ' + error.message);
            setIsError(true);
        }
    };

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
        if (!passwordPattern.test(newPassword)) {
            if (!/(?=.*[@$!%*?&])/.test(newPassword)) {
                setErrorTextPass("At least one special character");
            }
            else if (!/(?=.*[A-Z])/.test(newPassword)) {
                setErrorTextPass("At least one uppercase letter");
            }
            else if (!/(?=.*[a-z])/.test(newPassword)) {
                setErrorTextPass("At least one lowercase letter");
            }
            else if (!/(?=.*\d)/.test(newPassword)) {
                setErrorTextPass("At least one number");
            }
            else if (newPassword.length < 8) {
                setErrorTextPass("At least 8 characters");
            }
        } else {
            setErrorTextPass('');
        }
        setPassword(newPassword);
    }

    const handleConfirm = (e) => {
        const newConPassword = e.target.value;
        if (password !== newConPassword) {
            setErrorTextConPass("Passwords do not match");
        } else if (newConPassword == "") {
            setErrorTextConPass('');
        } else {
            setErrorTextConPass('');
        }
        setConfirmPassword(e.target.value);
    };

    const backButton = () => {
        routes.push('/login/');
    };

    return (
        <div className="Register-container">
            <button className='back-button' onClick={backButton}>Back to Login</button>
            <h1>Register</h1>
            
            {alertMessage && (
                <div className={isError ? 'alert error' : 'alert success'}>
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePassword} required />
                    <span>{errorTextPass}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirm} required />
                    <span>{errorTextConPass}</span>
                </div>
                <div className="form-button">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register;