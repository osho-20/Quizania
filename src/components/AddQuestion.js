import React, { useState } from 'react'
import DisplayQuestions from '../components/DisplayQuestions'
import { getDatabase, update, ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
const AddQuestion = (props) => {
    let general_instructions = props.p[0];
    console.log(general_instructions.id);
    const auth = getAuth();
    const navg = useNavigate();
    const key = props.p[1];
    const [count, setCount] = useState(1);
    const [quiz, setQuiz] = useState({ general_instructions, questions: [{}] });
    const [opt, setOpt] = useState({ currentoption: [], answer: [] });
    const [curropt, setCurrentOpt] = useState('');
    const [Ans, setAns] = useState('');
    const [QuestionDes, setQuestionDes] = useState('');
    const [marks, setMarks] = useState('');
    const [edit, setEdit] = useState(0);
    const [err, setError] = useState('');
    const [score, setscore] = useState(0);
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
        if (count > Number(quiz.general_instructions.quizNoOfQuest)) {
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
            console.log(quiz.questions.length, quiz.general_instructions);
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
        if (score !== Number(quiz.general_instructions.quizScore)) {
            setError('Please check your marking scheme it doesn\'t match with the total score.');
            return;
        }
        const db = getDatabase();
        const QuizQuestion = quiz.questions;
        await update(ref(db, 'Quiz/' + key), {
            QuizQuestion,
        }).then((res) => {
        }).catch((err) => { console.log(err) });
        alert('Quiz Created');
        await update(ref(db, 'Questions/' + quiz.general_instructions.id), {
            QuizQuestion,
        }).then((res) => {
        }).catch((err) => { console.log(err) });
        alert('Quiz Created');
        navg('/' + auth.currentUser.uid);
    }
    return (
        <div className="Quiz-descrp">
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
                quiz.questions.length === Number(quiz.general_instructions.quizNoOfQuest) ?
                    <span className="question-button">
                        <button type="submit" onClick={submit}>Submit</button>
                    </span> : <p></p>
            }
            <DisplayQuestions q={quiz} />

        </div>
    )
}

export default AddQuestion;