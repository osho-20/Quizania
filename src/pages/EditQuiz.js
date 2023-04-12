import React, { useEffect, useState } from 'react'
import Header from '../components/HeaderProfile';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import DisplayQuestions from '../components/DisplayQuestions';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const EditQuiz = (props) => {
    const db = getDatabase();
    const navg = useNavigate();
    const KEY = props.p[1];
    const document = ref(db, 'Quiz/' + KEY);
    const [quizs, setQuizs] = useState([]);
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
    const [dis, setDis] = useState(-1);
    const [err, setError] = useState('');
    const [count, setCount] = useState();
    const [opt, setOpt] = useState({ currentoption: [], answer: [] });
    const [curropt, setCurrentOpt] = useState('');
    const [Ans, setAns] = useState('');
    const [QuestionDes, setQuestionDes] = useState('');
    const [marks, setMarks] = useState('');
    const [edit, setEdit] = useState(0);
    const [score, setscore] = useState(0);
    useEffect(() => {
        onValue(document, (snap) => {
            const data = snap.val();
            setQuizs(data);
        })
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }

    }, [])
    const alertUser = e => {
        e.preventDefault()
        e.returnValue = 'Relodaing will erase all the changes';
    }
    const Addopt = (e) => {
        e.preventDefault();
        if (curropt !== '') {
            let option = opt.currentoption;
            option.push(curropt);
            setOpt({ ...opt, currentoption: option });
            setCurrentOpt('');
            return;
        }
    }
    const Deleteopt = (e) => {
        e.preventDefault();
        let option = opt.currentoption;
        if (option.length !== 0) {
            option.pop();
        }
        setCurrentOpt('');
    }
    const AddAns = (e) => {
        e.preventDefault();
        if (Number(Ans) !== NaN) {
            let arr = opt.answer;
            if (Ans <= opt.currentoption.length) {
                arr.push(Ans);
                setOpt({ ...opt, answer: arr });
                setAns('');
                return;
            }
            else {
                setError('Please enter a valid option number');
                return;
            }
        }
    }
    const DeleteAns = (e) => {
        e.preventDefault();
        let arr = opt.answer;
        if (arr.length !== 0) {
            arr.pop();
        }
        setOpt({ ...opt, answer: arr });
        setAns('');
    }
    const Addquest = async (e) => {
        e.preventDefault();
        if (!QuestionDes || opt.currentoption.length === 0 || opt.answer.length === 0 || !marks || Number(marks) === NaN || Number(marks) < 0) {
            setError("Please fill the correct details i.e; Description Must not be empty, Options must not be empty, Answer must not be empty and correct option must be inserted as answer, marks cannot be negative.");
            return;
        }
        if (count <= 0) {
            setCount(1);
        }
        else {
            setCount(count + 1);
            setEdit(0);
        }
        if (count > Number(quiz.general_instructions.TotalQuestions)) {
            setError('You have reached max number of questions,cannot add new question.');
            setQuestionDes('');
            setOpt({ currentoption: [], answer: [] });
            setMarks('');
            setAns('');
            setEdit(0);
            return;
        }
        else {
            let ArrayofQuestions = quiz.questions;
            ArrayofQuestions.push({ id: count, description: QuestionDes, options: opt.currentoption, answer: opt.answer, marks: marks });
            setscore(score + marks);
            setQuiz({ ...quiz, questions: ArrayofQuestions });
            setQuestionDes('');
            setOpt({ currentoption: [], answer: [] });
            setMarks('');
            setAns('');
            setError('');
            setEdit(0);

        }
    }
    const Deletequest = (e) => {
        e.preventDefault();
        if (count <= 1) {
            setCount(1);
        }
        else {
            setCount(count - 1);
        }
        if (!QuestionDes && opt.currentoption.length === 0 && opt.answer.length === 0 && !marks) {

            let ArrayofQuestions = quiz.questions;
            if (ArrayofQuestions.length > 0) {
                let t = ArrayofQuestions.pop();
                setscore(score - t.marks);
                setQuiz({ ...quiz, questions: ArrayofQuestions });
                return;
            }
        }
        setMarks('');
        setAns('');
        setError('');
        setOpt({ currentoption: [], answer: [] });
        setQuestionDes('');
        setEdit(0);
    }
    const AddDesc = (e) => {
        e.preventDefault();
        setEdit(1);
        return;
    }
    const Adddescp = (e) => {
        e.preventDefault();
        setQuestionDes(e.target.value);
        return;
    }
    const EditDesc = (e) => {
        e.preventDefault();
        setEdit(0);
        return;
    }
    const submit = async (e) => {
        e.preventDefault();
        if (score !== Number(quiz.general_instructions.QuizMarks)) {
            setError('Please check your marking scheme it doesn\'t match with the total score.');
            return;
        }
        const db = getDatabase();
        const doc1 = ref(db, 'Quiz/' + KEY);
        await update(doc1, {
            DurationTime: quiz.general_instructions.DurationTime,
            EndTime: quiz.general_instructions.EndTime,
            QuizCreater: quiz.general_instructions.QuizCreater,
            QuizDescription: quiz.general_instructions.QuizDescription,
            QuizMarks: quiz.general_instructions.QuizMarks,
            QuizAttempts: quiz.general_instructions.QuizAttempts,
            QuizName: quiz.general_instructions.QuizName,
            StartTime: quiz.general_instructions.StartTime,
            TotalQuestions: quiz.general_instructions.TotalQuestions,
            QuizQuestion: quiz.questions,
        }).then((res) => {
        }).catch((err) => { console.log(err) });
        onValue(doc1, (snap) => {
            const data = snap.val();
            const doc2 = ref(db, 'Questions/' + data.Quizid);
            update(doc2, {
                QuizQuestion: quiz.questions,
                QuizAttempts: quiz.general_instructions.QuizAttempts,
            }).then((res) => {
                console.log('updated');
            }).catch((err) => { console.log(err) });
        })
        Swal.fire(
            'Hurray!!',
            'The Quiz Updated Successfully.',
            'success'
        )
        navg('/user=' + auth.currentUser.displayName);
    }
    const StartEditing = async (e) => {
        e.preventDefault();
        setQuizName(quizs.QuizName);
        setQuizDescrp(quizs.QuizDescription);
        setQuizCreater(quizs.QuizCreater);
        setQuizNoOfQuest(quizs.TotalQuestions);
        setQuizScore(quizs.QuizMarks);
        setAttempts(quizs.QuizAttempts);
        setStart(quizs.StartTime);
        setEnd(quizs.EndTime);
        setDuration(quizs.DurationTime);
        setCount(Number(quizs.TotalQuestions) + 1);
        setscore(Number(quizs.QuizMarks));
        let arr = {
            Quizid: quizs.Quizid,
            QuizName: quizs.QuizName,
            QuizDescription: quizs.QuizDescription,
            TotalQuestions: quizs.TotalQuestions,
            QuizCreater: quizs.QuizCreater,
            QuizMarks: quizs.QuizMarks,
            QuizAttempts: quizs.QuizAttempts,
            StartTime: quizs.StartTime,
            EndTime: quizs.EndTime,
            DurationTime: quizs.DurationTime,
        };
        setQuiz({ general_instructions: arr, questions: quizs.QuizQuestion });
        if (dis === -1) {
            setDis(1);
        }
        else
            setDis(1 - dis);
    }
    const Save = async (e) => {
        e.preventDefault();
        let arr = {
            Quizid: quizs.Quizid,
            QuizName: quizName,
            QuizDescription: quizDescrp,
            TotalQuestions: quizNoOfQuest,
            QuizCreater: quizCreater,
            QuizMarks: quizScore,
            QuizAttempts: attempts,
            StartTime: start,
            EndTime: end,
            DurationTime: duration,
        };
        setQuiz({ general_instructions: arr, questions: quizs.QuizQuestion });
        setDis(1 - dis);
    }
    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/Quizania/user=' + auth.currentUser.displayName;
        }, 0);
        window.onbeforeunload = null;
    }
    return (
        <div >
            <Header p={props.p[0]} />
            <div className='create'>
                <form className="create-quiz">
                    {
                        dis === -1 ? <div>
                            <p style={{ margin: '20px', color: 'white' }}>
                                Please make sure don't reload or exit without saving and submitting the changes .
                            </p>
                            <button onClick={StartEditing}>Start Editing</button></div> :
                            <div className="Quiz-descrp">
                                <h1 style={{ color: 'white' }}>Edit Quiz</h1>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Name for the Quiz</label>
                                    <input type='text' id="create-quiz-input" value={quizName} onChange={(e) => setQuizName(e.target.value)} placeholder="Please enter the Title" disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Description</label>
                                    <textarea type='text' id="create-quiz-textarea" rows="5" value={quizDescrp} onChange={(e) => setQuizDescrp(e.target.value)} placeholder="Please enter the description" disabled={dis}></textarea>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Created By</label>
                                    <input type='text' id="create-quiz-input" value={quizCreater} onChange={(e) => setQuizCreater(e.target.value)} placeholder="Creater's Name" disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Number of Questions</label>
                                    <input type='numeric' id="create-quiz-input" value={quizNoOfQuest} onChange={(e) => setQuizNoOfQuest(e.target.value)} placeholder="Please enter an Integer" disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Total score</label>
                                    <input type='numeric' id="create-quiz-input" value={quizScore} onChange={(e) => setQuizScore(e.target.value)} placeholder="Please enter an Integer" disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Total Attempts</label>
                                    <input type='numeric' id="create-quiz-input" value={attempts} onChange={(e) => setAttempts(e.target.value)} placeholder="Please enter an Integer" disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Start Time</label>
                                    <input type='datetime-local' id="create-quiz-input" value={start} onChange={(e) => setStart(e.target.value)} disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">End Time</label>
                                    <input type='datetime-local' id="create-quiz-input" value={end} onChange={(e) => setEnd(e.target.value)} disabled={dis}></input>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Duration Time</label>
                                    <input type='time' id="create-quiz-input" value={duration} onChange={(e) => setDuration(e.target.value)} disabled={dis}></input>
                                </div>
                                {
                                    err !== '' ? <p style={{ color: 'white' }}>{err}</p> : <p></p>
                                }
                                <span className="question-button">
                                    {
                                        dis === 1 ? <button onClick={StartEditing} >Edit Quiz</button> : <button onClick={Save} >Save Quiz</button>
                                    }

                                </span>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Question</label>
                                    <textarea type="text" id="create-quiz-input" rows="5" value={QuestionDes} onChange={Adddescp} disabled={edit}></textarea>
                                </div>
                                <span className="question-button">
                                    {
                                        edit === 0 ? <button onClick={AddDesc} id="add-delete">Add Descrp</button> : <button onClick={EditDesc} id="add-delete">Edit Descrp</button>
                                    }
                                </span>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Options</label>
                                    <div style={{ alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%' }}>
                                        <input type="text" id="create-quiz-input" style={{ width: '100%' }} value={curropt} onChange={(e) => setCurrentOpt(e.target.value)}></input><button onClick={Addopt} id="add-del">Add</button><button onClick={Deleteopt} id="add-del">Delete</button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Answer</label>
                                    <div style={{ alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%' }}>
                                        <input type="text" id="create-quiz-input" value={Ans} style={{ width: '100%' }} onChange={(e) => setAns(Number(e.target.value))} placeholder="Please write the option number."></input><button onClick={AddAns} id="add-del">Add</button><button onClick={DeleteAns} id="add-del">Delete</button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <label id="create-quiz-label">Marks</label>
                                    <input type="numeric" id="create-quiz-input" value={marks} onChange={(e) => setMarks(Number(e.target.value))} placeholder="Pleas enter the marks."></input>
                                </div>
                                {
                                    err !== '' ? <p style={{ color: 'white' }}>{err}</p> : <p></p>
                                }
                                <span className="question-button">
                                    <button onClick={Addquest} id="add-delete">Add Questions</button>
                                    <button onClick={Deletequest} id="add-delete">Delete Questions</button>
                                </span>
                                {
                                    quiz.questions.length === Number(quiz.general_instructions.TotalQuestions) ?
                                        <span className="question-button">
                                            <button type="submit" onClick={submit}>Submit</button>
                                        </span> : <p></p>
                                }
                                <DisplayQuestions q={quiz} />
                            </div>
                    }

                </form>
            </div>
        </div>
    )
}

export default EditQuiz
