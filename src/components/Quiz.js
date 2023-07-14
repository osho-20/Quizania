import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../firebase'
import AddQuestion from '../components/AddQuestion'
import { v4 as uuid } from 'uuid';
const Quiz = () => {
    const [quizName, setQuizName] = useState('');
    const [quizDescrp, setQuizDescrp] = useState('');
    const [quizCreater, setQuizCreater] = useState('');
    const [quizNoOfQuest, setQuizNoOfQuest] = useState('');
    const [quizScore, setQuizScore] = useState('');
    const [attempts, setAttempts] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [duration, setDuration] = useState('');
    const [quiz, setQuiz] = useState({});
    const [key, setKey] = useState('');
    const [dis, setDis] = useState(0);
    const [err, setErr] = useState('');
    const [Qid, setQid] = useState('');
    const Quizid = uuid();
    const auth = getAuth();
    const Create = async (e) => {
        e.preventDefault();
        const QuizName = quizName;
        const QuizDescription = quizDescrp;
        const QuizCreater = quizCreater;
        const TotalQuestions = quizNoOfQuest;
        const QuizMarks = quizScore;
        const QuizAttempts = attempts;
        const StartTime = start;
        const EndTime = end;
        const DurationTime = duration;
        if (key === '') {
            if (!quizName || !quizDescrp || !quizCreater || TotalQuestions === 0 || quizScore === 0) {
                setErr('**Please fill all the entries to create quiz.**');
                return;
            }
            let id = '';
            await fetch(process.env.REACT_APP_Questions,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        QuizAttempts,
                        uid: auth.currentUser.uid,
                    })
                }
            ).then(res => res.json())
                .then(resp => {
                    id = resp.name;
                    setDis(1);
                })
            setQuiz({ id: id, quizName, quizDescrp, quizCreater, quizNoOfQuest, quizScore });
            await fetch(process.env.REACT_APP_Quiz,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Quizid: id,
                        QuizName,
                        QuizDescription,
                        TotalQuestions,
                        QuizCreater,
                        QuizMarks,
                        QuizAttempts,
                        StartTime,
                        EndTime,
                        DurationTime,
                        uid: auth.currentUser.uid,
                    })
                }
            ).then(res => res.json())
                .then(resp => {
                    setKey(resp.name);
                    const document = doc(firestore, 'creaters', auth.currentUser.uid);
                    updateDoc(document, {
                        quizs: arrayUnion(resp.name),
                    });
                    setDis(1);
                })
            setErr('Quiz Created');
        }
    }
    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/Quizania/user=' + auth.currentUser.displayName;
        }, 0);
        window.onbeforeunload = null;
    }
    return (
        <div className="Quiz-descrp">
            <h1 style={{ color: 'white' }}>Create Quiz</h1>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Quiz Name</label>
                <input type='text' id="create-quiz-input" value={quizName} onChange={(e) => setQuizName(e.target.value)} placeholder="Please enter the Title" disabled={dis} required></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Description</label>
                <textarea type='text' id="create-quiz-textarea" rows="2" value={quizDescrp} onChange={(e) => setQuizDescrp(e.target.value)} placeholder="Please enter the description" disabled={dis} required></textarea>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Created By</label>
                <input type='text' id="create-quiz-input" value={quizCreater} onChange={(e) => setQuizCreater(e.target.value)} placeholder="Creater's Name" disabled={dis} required></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Number of Questions</label>
                <input type='numeric' id="create-quiz-input" value={quizNoOfQuest} onChange={(e) => setQuizNoOfQuest(e.target.value)} placeholder="Please enter an Integer" disabled={dis} required></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Total score</label>
                <input type='numeric' id="create-quiz-input" value={quizScore} onChange={(e) => setQuizScore(e.target.value)} placeholder="Please enter an Integer" disabled={dis} required ></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Number of attempts</label>
                <input type='numeric' id="create-quiz-input" value={attempts} onChange={(e) => setAttempts(e.target.value)} placeholder="Please enter an Integer" disabled={dis} required ></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Start Time</label>
                <input type='datetime-local' id="create-quiz-input" onChange={(e) => setStart(e.target.value)} disabled={dis} required></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">End Time</label>
                <input type='datetime-local' id="create-quiz-input" onChange={(e) => setEnd(e.target.value)} disabled={dis} required></input>
            </div>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label id="create-quiz-label">Duration Time(hh:mm)</label>
                <input type='time' id="create-quiz-input" onChange={(e) => setDuration(e.target.value)} disabled={dis} required></input>
            </div>
            {
                err !== '' ? <p style={{ color: 'red' }}>{err}</p> : <p></p>
            }
            <span className="question-button">
                <button onClick={Create} disabled={dis}>Create Quiz</button>
            </span>
            {
                dis === 0 ? <p></p> : <AddQuestion p={[quiz, key]} />
            }
        </div>
    )
}

export default Quiz
