import React, { useState } from 'react'
import Header from '../components/Header'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2'
const Forgot = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const Change = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.fire(
                    'Sent',
                    'Kindly check your email for reseting password.',
                    'success'
                ).then(() => {
                    window.location = '/Quizania/Quizania';
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <div>
            <Header />
            <div className="report">
                <h1>Forgot Password</h1>
                <div id="report-container">
                    <form className="report-page">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
                            <label id="forgot-label">Email</label>
                            <input id="forgot-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='xyz@gmail.com' name="password" />
                        </div>
                        <div>
                            <button id="login-button" onClick={Change}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot
