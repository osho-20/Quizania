import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth'
import { auth, firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [fullName, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const create = async () => {
        console.log(auth.currentUser)
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('sent');
            })
            .catch((err) => { console.log(err) });
        await updateProfile(auth.currentUser, {
            displayName: fullName,
        }).then(() => { console.log('updated') });
        await setDoc(doc(firestore, 'creaters', auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
        })
        window.location.reload(false);
    }
    const submit = (e) => {
        e.preventDefault();
        if (!email || !pass || !fullName) {
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        createUserWithEmailAndPassword(auth, email, pass)
            .then(async (resp) => {
                alert('Kindly verify your email and try to login again.');
                create();
                return;
            })
            .catch((err) => { console.log("Error= ", err); return; });
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
                {
                    error !== '' ? <p>{error}</p> : <p></p>
                }
                <button type="submit">Register</button>
                <p style={{ marginBottom: '2px', color: 'white' }}>Already have an account?</p>
                <button onClick={() => props.onFormSwitch('login')}>Login</button>
            </form>
        </div>
    )
}
export default RegisterPage
