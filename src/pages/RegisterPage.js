import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth'
import { auth, firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import cover from '../components/img/loginpage.png'
import { useNavigate } from 'react-router-dom';
const RegisterPage = (props) => {
    const navg = useNavigate();
    if (auth.currentUser !== null && auth.currentUser.emailVerified === true) {
        navg('/user=' + auth.currentUser.displayName);
    };
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
                await updateProfile(auth.currentUser, {
                    displayName: fullName,
                }).then(() => { console.log('updated') });
                await setDoc(doc(firestore, 'creaters', auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                }).then(() => {
                    console.log('created');
                }).catch((err) => {
                    console.log(err);
                })
                await sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('sent');
                    })
                    .catch((err) => { console.log(err) });
                await Swal.fire(
                    'Registered!',
                    'Kindly verify your email and login again.',
                    'info'
                ).then(() => {
                    window.location.reload(false);
                });
            })
            .catch((err) => {
                Swal.fire(
                    'Oops!',
                    'This email address is already used.',
                    'error'
                )
            });
    }
    return (
        <div id="outer-login-box">
            <div className="register">
                <div>
                    <img src={cover} id="cover" />
                </div>
                <form onSubmit={submit} className="register-page">
                    <p className='heading'>Register</p>
                    <div>
                        <label id="login-input">Full Name</label>
                        <input value={fullName} onChange={(e) => setName(e.target.value)} type="name" placeholder="xyz" />
                    </div>
                    <div>
                        <label id="login-input">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="xyz@gmial.com" />
                    </div>
                    <div>
                        <label id="login-input">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" />
                    </div>
                    {
                        error !== '' ? <p>{error}</p> : <p></p>
                    }
                    <div>
                        <button type="submit" id="login-button">Register</button>
                        <p style={{ marginBottom: '2px', color: 'white' }}>Already have an account?</p>
                        <button onClick={() => props.onFormSwitch('login')} id="login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterPage
