import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navg = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        console.log(email, pass);
        if (!email || !pass) {
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        signInWithEmailAndPassword(auth, email, pass)
            .then(async (resp) => {
                if (auth.currentUser.emailVerified) {
                    const path = '/' + resp.user.uid;
                    navg(path);
                    return;
                }
                else {
                    alert('Kindly verify your email first.');
                    window.location.reload(false);
                    navg('/');
                }
            })
            .catch((err) => { alert("User Not Found.") });
    }
    return (
        <div className="login">
            <form onSubmit={submit} className="login-page">
                <p className='heading'>Login</p>
                <label htmlFor="Email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder='xyz@gmail.com' name="email" />
                <label htmlFor="Password">Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder='******' name="password" />
                <button type="submit">Login</button>
                {
                    (error === '') ? <p></p> : <p style={{ color: 'rgb(253 4 6)' }}>{error}</p>
                }
                <p style={{ marginBottom: '2px', color: 'white' }}>Don't have an account?</p>
                <button onClick={() => props.onFormSwitch('register')}>Register</button>
            </form >
        </div>
    )
}
export default LoginPage;
