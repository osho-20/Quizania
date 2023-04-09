import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import { auth } from '../firebase'
const ReportIssue = () => {
    const [issue, setIssue] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        await fetch('https://quizania-cafe7-default-rtdb.firebaseio.com/ReportIssue.json',
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
                alert('Issue reported. Thanks for reporting the issue we will try to fix it asap.');
            }).catch((err) => {
                console.log(err);
            })
        window.location = '/Quizania/' + auth.currentUser.uid;
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
