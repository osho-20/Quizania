import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
const RegisterPage = (props) => {
    const navg = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const submit = (e) => {
        e.preventDefault();
        if (!email || !pass || !fullName) {
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        createUserWithEmailAndPassword(auth, email, pass)
            .then(async (resp) => {
                console.log(auth.currentUser)
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('sent');
                    })
                    .catch((err) => { console.log(err) });
                updateProfile(auth.currentUser, {
                    displayName: fullName,
                });
                alert('Kindly verify your email and try to login again.');
                window.location.reload(false);
                return;
            })
            .catch((err) => { console.log("Error= ", err) });
    }
    return (
        <div className="register">
            <form onSubmit={submit} className="register-page">
                <p className='heading'>Register</p>
                <label>Full Name</label>
                <input value={fullName} onChange={(e) => setName(e.target.value)} type="name" placeholder="xyz" />
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="xyz@gmial.com" />
                <label>Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" />
                <button type="submit">Register</button>
                <p style={{ marginBottom: '2px', color: 'white' }}>Already have an account?</p>
                <button onClick={() => props.onFormSwitch('login')}>Login</button>
            </form>
        </div>
    )
}
export default RegisterPage
