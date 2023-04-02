import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../firebase'
import AddQuestion from '../components/AddQuestion'
const Quiz = () => {
    const [quizName, setQuizName] = useState('');
    const [quizDescrp, setQuizDescrp] = useState('');
    const [quizCreater, setQuizCreater] = useState('');
    const [quizNoOfQuest, setQuizNoOfQuest] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quiz, setQuiz] = useState({});
    const [key, setKey] = useState('');
    const [dis, setDis] = useState(0);
    const [err, setErr] = useState('');
    const auth = getAuth();
    const Create = async (e) => {
        e.preventDefault();
        setQuiz({ quizName, quizDescrp, quizCreater, quizNoOfQuest, quizScore });
        const QuizName = quizName;
        const QuizDescription = quizDescrp;
        const QuizCreater = quizCreater;
        const TotalQuestions = quizNoOfQuest;
        const QuizMarks = quizScore;
        if (key === '') {
            if (!quizName || !quizDescrp || !quizCreater || TotalQuestions === 0 || quizScore === 0) {
                setErr('Please fill all the entries to create quiz.');
                return;
            }
            await fetch('https://quizania-cafe7-default-rtdb.firebaseio.com/Quiz.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        QuizName,
                        QuizDescription,
                        TotalQuestions,
                        QuizCreater,
                        QuizMarks,
                    })
                }
            ).then(res => res.json())
                .then(resp => {
                    setKey(resp.name);
                    const document = doc(firestore, 'creaters', auth.currentUser.uid);
                    updateDoc(document, {
                        name: "Yash Jain",
                        quizs: arrayUnion('Quiz/' + resp.name),
                    });
                    setDis(1);
                })
            setErr('Quiz Created');
        }
    }
    return (
        <div className="Quiz-descrp">

            <h1 style={{ color: 'white' }}>Create Quiz</h1>
            <label>Name for the Quiz</label>
            <input type='text' value={quizName} onChange={(e) => setQuizName(e.target.value)} disabled={dis}></input>
            <label>Description</label>
            <textarea type='text' rows="5" value={quizDescrp} onChange={(e) => setQuizDescrp(e.target.value)} disabled={dis}></textarea>
            <label>Created By</label>
            <input type='text' value={quizCreater} onChange={(e) => setQuizCreater(e.target.value)} disabled={dis}></input>
            <label>Number of Questions</label>
            <input type='numeric' value={quizNoOfQuest} onChange={(e) => setQuizNoOfQuest(e.target.value)} disabled={dis}></input>
            <label>Total score</label>
            <input type='numeric' value={quizScore} onChange={(e) => setQuizScore(e.target.value)} disabled={dis}></input>
            {
                err !== '' ? <p style={{ color: 'white' }}>{err}</p> : <p></p>
            }
            <span className="question-button">
                <button onClick={Create} disabled={dis}>Create Quiz</button>
            </span>
            {
                dis === 0 ? <p></p> : <AddQuestion p={quiz} />
            }
            {
                dis === 0 ? <p></p> : <span className="question-button">
                    <button type="submit">Submit</button>
                </span>
            }

        </div>
    )
}

export default Quiz
