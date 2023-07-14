import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase'
import Swal from 'sweetalert2';
import cover from '../components/img/Login.png'
const LoginPage = (props) => {
    const navg = useNavigate();
    if (auth.currentUser !== null && auth.currentUser.emailVerified === true) {
        navg('/user=' + auth.currentUser.displayName);
    };
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const submit = (e) => {
        e.preventDefault();
        if (!email || !pass) {
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        signInWithEmailAndPassword(auth, email, pass)
            .then(async (resp) => {
                if (auth.currentUser.emailVerified) {
                    Swal.fire(
                        'Welcome!',
                        'Logged In Successfully.',
                        'success'
                    )
                    const path = '/user=' + resp.user.displayName;
                    navg(path);
                    return;
                }
                else {
                    await sendEmailVerification(auth.currentUser)
                        .then(() => {
                            console.log('sent');
                        })
                        .catch((err) => { console.log(err) });
                    Swal.fire(
                        'Registered!',
                        'Kindly verify your email and login again.',
                        'info'
                    ).then(() => {
                        window.location.reload(false);
                    });
                }
            })
            .catch((err) => {
                Swal.fire(
                    'Oops!',
                    'Invalid email address/password.',
                    'error'
                )
            });
    }
    return (
        <div id="outer-login-box" >
            <div className="login">
                <div>
                    <img src={cover} id="cover" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={submit} className="login-page">
                        <p className='heading'>LOGIN</p>
                        <div>
                            <label htmlFor="Email" id="login-input">Email</label>
                            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder='xyz@gmail.com' name="email" />
                        </div>
                        <div>
                            <label htmlFor="Password" id="login-input">Password</label>
                            <input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder='******' name="password" />
                        </div>
                        <div>
                            <button type="submit" id="login-button">Login</button>
                            <div style={{ margin: '0px', padding: '0px' }}>
                                <p onClick={() => navg('/forgot')} id="forgot-link">Forgot Password</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ marginBottom: '2px', color: 'white' }}>Don't have an account?</p>
                            <button onClick={() => props.onFormSwitch('register')} id="login-button">Register</button>
                        </div>
                    </form >
                </div>
            </div>
        </div>
    )
}
export default LoginPage;
