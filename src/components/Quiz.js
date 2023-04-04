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
        const StartTime = start;
        const EndTime = end;
        const DurationTime = duration;
        if (key === '') {
            if (!quizName || !quizDescrp || !quizCreater || TotalQuestions === 0 || quizScore === 0) {
                setErr('Please fill all the entries to create quiz.');
                return;
            }
            let id = '';
            await fetch('https://quizania-cafe7-default-rtdb.firebaseio.com/Questions.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: 'null',
                    })
                }
            ).then(res => res.json())
                .then(resp => {
                    id = resp.name;
                    setDis(1);
                })
            setQuiz({ id: id, quizName, quizDescrp, quizCreater, quizNoOfQuest, quizScore });
            await fetch('https://quizania-cafe7-default-rtdb.firebaseio.com/Quiz.json',
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
                        StartTime,
                        EndTime,
                        DurationTime,
                    })
                }
            ).then(res => res.json())
                .then(resp => {
                    setKey(resp.name);
                    const document = doc(firestore, 'creaters', auth.currentUser.uid);
                    updateDoc(document, {
                        name: quizCreater,
                        quizs: arrayUnion(resp.name),
                    });
                    setDis(1);
                })
            setErr('Quiz Created');
        }
    }
    return (
        <div className="Quiz-descrp">
            <div>
                <h1 style={{ color: 'white' }}>Create Quiz</h1>
                <label>Name for the Quiz</label>
            </div>
            <input type='text' value={quizName} onChange={(e) => setQuizName(e.target.value)} placeholder="Please enter the Title" disabled={dis}></input>
            <label>Description</label>
            <textarea type='text' rows="5" value={quizDescrp} onChange={(e) => setQuizDescrp(e.target.value)} placeholder="Please enter the description" disabled={dis}></textarea>
            <label>Created By</label>
            <input type='text' value={quizCreater} onChange={(e) => setQuizCreater(e.target.value)} placeholder="Creater's Name" disabled={dis}></input>
            <label>Number of Questions</label>
            <input type='numeric' value={quizNoOfQuest} onChange={(e) => setQuizNoOfQuest(e.target.value)} placeholder="Please enter an Integer" disabled={dis}></input>
            <label>Total score</label>
            <input type='numeric' value={quizScore} onChange={(e) => setQuizScore(e.target.value)} placeholder="Please enter an Integer" disabled={dis}></input>
            <label>Start Time</label>
            <input type='datetime-local' onChange={(e) => setStart(e.target.value)} disabled={dis}></input>
            <label>End Time</label>
            <input type='datetime-local' onChange={(e) => setEnd(e.target.value)} disabled={dis}></input>
            <label>Duration Time</label>
            <input type='time' onChange={(e) => setDuration(e.target.value)} disabled={dis}></input>
            {
                err !== '' ? <p style={{ color: 'white' }}>{err}</p> : <p></p>
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
