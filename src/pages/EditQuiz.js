import React, { useEffect, useState } from 'react'
import Header from '../components/HeaderProfile';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import DisplayQuestions from '../components/DisplayQuestions';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
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
        // window.addEventListener('afterunload', navg('/' + auth.currentUser.uid));
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
                console.log(ArrayofQuestions);
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
        console.log(quiz.questions.length);
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
        console.log(score, Number(quiz.general_instructions.quizScore));
        if (score !== Number(quiz.general_instructions.QuizMarks)) {
            setError('Please check your marking scheme it doesn\'t match with the total score.');
            return;
        }
        const db = getDatabase();
        await update(ref(db, 'Quiz/' + KEY), {
            DurationTime: quiz.general_instructions.DurationTime,
            EndTime: quiz.general_instructions.EndTime,
            QuizCreater: quiz.general_instructions.QuizCreater,
            QuizDescription: quiz.general_instructions.QuizDescription,
            QuizMarks: quiz.general_instructions.QuizMarks,
            QuizName: quiz.general_instructions.QuizName,
            StartTime: quiz.general_instructions.StartTime,
            TotalQuestions: quiz.general_instructions.TotalQuestions,
            QuizQuestion: quiz.questions,
        }).then((res) => {
        }).catch((err) => { console.log(err) });
        alert('Quiz Updated');
        navg('/' + auth.currentUser.uid);
    }
    const StartEditing = async (e) => {
        e.preventDefault();
        setQuizName(quizs.QuizName);
        setQuizDescrp(quizs.QuizDescription);
        setQuizCreater(quizs.QuizCreater);
        setQuizNoOfQuest(quizs.TotalQuestions);
        setQuizScore(quizs.QuizMarks);
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
        // console.log('count= ', quiz.questions.length, Number(quizs.TotalQuestions));
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
            StartTime: start,
            EndTime: end,
            DurationTime: duration,
        };
        setQuiz({ general_instructions: arr, questions: quizs.QuizQuestion });
        setDis(1 - dis);
    }
    // console.log('count= ', score);
    return (
        <div>
            <Header p={props.p[0]} />
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                {
                    dis === -1 ? <button onClick={StartEditing}>Start Editing</button> :
                        <div className="Quiz-descrp">
                            <h1 style={{ color: 'white' }}>Edit Quiz</h1>
                            <label>Name for the Quiz</label>
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
                            <input type='datetime-local' value={start} onChange={(e) => setStart(e.target.value)} disabled={dis}></input>
                            <label>End Time</label>
                            <input type='datetime-local' value={end} onChange={(e) => setEnd(e.target.value)} disabled={dis}></input>
                            <label>Duration Time</label>
                            <input type='time' value={duration} onChange={(e) => setDuration(e.target.value)} disabled={dis}></input>
                            {
                                err !== '' ? <p style={{ color: 'white' }}>{err}</p> : <p></p>
                            }
                            <span className="question-button">
                                {
                                    dis === 1 ? <button onClick={StartEditing} >Edit Quiz</button> : <button onClick={Save} >Save Quiz</button>
                                }

                            </span>
                            <label>Question</label>
                            <textarea type="text" rows="5" value={QuestionDes} onChange={Adddescp} disabled={edit}></textarea>
                            <span className="question-button">
                                {
                                    edit === 0 ? <button onClick={AddDesc} id="add-delete">Add Descrp</button> : <button onClick={EditDesc} id="add-delete">Edit Descrp</button>
                                }
                            </span>
                            <label>Options</label>
                            <div style={{ alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%' }}>
                                <input type="text" style={{ width: '100%' }} value={curropt} onChange={(e) => setCurrentOpt(e.target.value)}></input><button onClick={Addopt} id="add-del">Add</button><button onClick={Deleteopt} id="add-del">Delete</button>
                            </div>
                            <label>Answer</label>
                            <div style={{ alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%' }}>
                                <input type="text" value={Ans} style={{ width: '100%' }} onChange={(e) => setAns(Number(e.target.value))} placeholder="Please write the option number."></input><button onClick={AddAns} id="add-del">Add</button><button onClick={DeleteAns} id="add-del">Delete</button>
                            </div>
                            <label>Marks</label>
                            <input type="numeric" value={marks} onChange={(e) => setMarks(Number(e.target.value))} placeholder="Pleas enter the marks."></input>
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
            </div>
        </div>
    )
}

export default EditQuiz
