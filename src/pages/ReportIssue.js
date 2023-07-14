import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import { auth } from '../firebase'
import Swal from 'sweetalert2'
const ReportIssue = () => {
    const [issue, setIssue] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        await fetch(process.env.REACT_APP_ReportIssue,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issue,
                })
            }
        ).then(res => res.json())
            .then(resp => {
                Swal.fire(
                    'Issue Reported!',
                    'Thanks for reporting the issue we will try to fix it asap.',
                    'success'
                ).then(() => {
                    window.location = '/Quizania';
                })
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <Header p={auth.currentUser} />
            <div className="report">
                <h1>Report Issue</h1>
                <div id="report-container">
                    <form className="report-page">
                        <textarea id="report-box" rows='5' onChange={(e) => setIssue(e.target.value)} placeholder="Please describe your issue here." />
                        <div>
                            <button onClick={submit} id="login-button">Report</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportIssue
