import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import Input from '../components/Input';
import PieChart from '../components/PieChart';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
var navg;
const Quiz = (props) => {
    const db = getDatabase();
    navg = useNavigate();
    const [data, setData] = useState({});
    const [id, setId] = useState(0);
    const [opt, setOpt] = useState({});
    const [incorrect, setIncorrect] = useState(0);
    const [partial, setPartial] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [unattampted, setUnattampted] = useState(0);
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(0);
    const [gen, setGen] = useState({});
    const [pie, setPie] = useState({});
    useEffect(() => {
        const doc = ref(db, 'Questions/' + props.p[1]);

        onValue(doc, (snap) => {
            const q = snap.val();
            setData(q);
            const key = q.key;
            const doc1 = ref(db, 'Quiz/' + key);
            onValue(doc1, (snap) => {
                const q = snap.val();
                setGen({
                    dt: q.DurationTime[0] + q.DurationTime[1] + ' hrs ' + q.DurationTime[3] + q.DurationTime[4] + ' mins',
                    et: q.EndTime.slice(0, 10) + ' at ' + q.EndTime.slice(11, 13) + ' hrs ' + q.EndTime.slice(14, 16) + ' mins',
                    qc: q.QuizCreater,
                    qd: q.QuizDescription,
                    qm: q.QuizMarks,
                    qn: q.QuizName,
                    st: q.StartTime,
                    tq: q.TotalQuestions,
                });
                const today = new Date();
                const date = today.getFullYear() + '-' + ((today.getMonth() + 1 < 10) ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
                const time = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
                console.log(date, time, q.StartTime);
                function CompareDateandtime(str1, strdate, strtime) {
                    const cyear = Number(strdate.slice(0, 4));
                    const cmonth = Number(strdate.slice(5, 7));
                    const cdate = Number(strdate.slice(8, 10));
                    const year = Number(str1.slice(0, 4));
                    const month = Number(str1.slice(5, 7));
                    const date = Number(str1.slice(8, 10));
                    const chrs = Number(strtime.slice(0, 2));
                    const cmins = Number(strtime.slice(3, 5));
                    const hrs = Number(str1.slice(11, 13));
                    const mins = Number(str1.slice(14, 16));
                    console.log(cyear, year, cmonth, month, cdate, date, chrs, hrs, cmins, mins);
                    if (cyear < year) {
                        alert('Quiz has not yet started.');
                        window.location.reload(false);
                        navg('/' + auth.currentUser.uid);
                    }
                    else if (cyear == year) {
                        if (cmonth < month) {
                            alert('Quiz has not yet started.');
                            window.location.reload(false);
                            navg('/' + auth.currentUser.uid);
                        }
                        else if (cmonth == month) {
                            if (cdate < date) {
                                alert('Quiz has not yet started.');
                                window.location.reload(false);
                                navg('/' + auth.currentUser.uid);
                            }
                            else if (cdate == date) {
                                if (chrs < hrs) {
                                    alert('Quiz has not yet started.');
                                    window.location.reload(false);
                                    navg('/' + auth.currentUser.uid);
                                }
                                else if (chrs == hrs) {
                                    if (cmins < mins) {
                                        alert('Quiz has not yet started.');
                                        window.location.reload(false);
                                        navg('/' + auth.currentUser.uid);
                                    }
                                    else if (cmins > mins) {
                                        alert('Quiz has Ended.');
                                        window.location.reload(false);
                                        navg('/' + auth.currentUser.uid);
                                    }

                                }
                                else {
                                    alert('Quiz has Ended.');
                                    window.location.reload(false);
                                    navg('/' + auth.currentUser.uid);
                                }
                            }
                            else {
                                alert('Quiz has Ended.');
                                window.location.reload(false);
                                navg('/' + auth.currentUser.uid);
                            }
                        }
                        else {
                            alert('Quiz has Ended.');
                            window.location.reload(false);
                            navg('/' + auth.currentUser.uid);
                        }
                    }
                    else {
                        alert('Quiz has Ended.');
                        window.location.reload(false);
                        navg('/' + auth.currentUser.uid);
                    }
                };
                CompareDateandtime(q.StartTime, date, time);
            })
        })

    }, [])
    const submit = async (e) => {
        e.preventDefault();
        const keys = Object.keys(opt);
        const ans = data.QuizQuestion[id].answer;
        let count = 0;
        for (const options of keys) {
            let check = false;
            ans.find((answer) => { check = (answer === Number(options) + 1) });
            if (opt[options] === 1 && check) {
                count = count + 1;
            }
            else if (opt[options] === 1 && !check) {
                count = -1;
                break;
            }
        }
        let i = incorrect, c = correct, u = unattampted, p = partial;
        if (count > 0) {
            let marksperoption = ans.length;
            if (count !== marksperoption) {
                setPartial(partial + 1);
                p = partial + 1;
            }
            else {
                setCorrect(correct + 1);
                c = correct + 1;
            }
            marksperoption = (data.QuizQuestion[id].marks / marksperoption) * count;
            setScore(score + marksperoption);
        }
        else if (count === 0) {
            setUnattampted(unattampted + 1);
            u = unattampted + 1;
        }
        else {
            setIncorrect(incorrect + 1);
            i = incorrect + 1;
        }
        setId(id + 1);
        setOpt({});
        console.log(id, data?.QuizQuestion?.length);
        if (id + 1 === data?.QuizQuestion?.length) {
            let arr = [];
            arr.push({ name: 'Incorrect', value: i });
            arr.push({ name: 'Correct', value: c });
            arr.push({ name: 'Unattampted', value: u });
            arr.push({ name: 'Partial', value: p });
            setPie(arr);
            return;
        }
    }
    const startquiz = (e) => {
        e.preventDefault();
        setStart(1);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                start === 0 ?
                    <div id="instructions">
                        <h1>Instructions</h1>
                        <p>{gen?.qd}</p>
                        <ul style={{ textAlign: 'left' }}>
                            <li>Quiz contains total {gen?.tq} number of questions.</li>
                            <li>Marks for each question is mentions after the question statement.</li>
                            <li>For each correct option partial marks will be awarded.</li>
                            <li>If any incorrect option is selected 0 marks will be awarded.</li>
                            <li>For unattempted question 0 marks will be awarded.</li>
                            <li>You can visit each question only once and the next question will appear after the current is submitted.</li>
                            <li>Do not try to open another window or reload page, if did quiz will end immediately.</li>
                            <li>The quiz will end after {gen?.dt} or on {gen.et} automatically.</li>
                            <li>The timer will help you in checking the remaining time.</li>
                            <li>The End button will appear on the last page, clicking it will submit the quiz.</li>
                        </ul>
                        <button id="start" onClick={startquiz}>Start</button>
                    </div>
                    : <div className='quiz1-box'>
                        {
                            data?.QuizQuestion?.map((get, index) => {
                                return (
                                    <div>
                                        {
                                            index === id ?
                                                < div key={index} className="quiz-display">
                                                    <div id="quiz-display2" style={{ height: '100%', margin: '20px 20px', marginBottom: '150px' }}>
                                                        <p style={{ color: 'white', textAlign: 'left', fontSize: '30px' }}>{index + 1}. {get.description}</p>
                                                        {
                                                            get?.options.map((val, index) => {
                                                                return (
                                                                    <Input
                                                                        key={index}
                                                                        objValue={{ label: val, option: opt, value: setOpt }}
                                                                        index={index}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        id !== (data?.QuizQuestion?.length - 1) ? <button id="quiz-submit-button" onClick={submit}>Submit Answer</button> : <button id="quiz-submit-button" onClick={submit}>Submit and End</button>
                                                    }
                                                </div> : <div style={{ height: '0px', width: '0px' }}></div>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            id === data?.QuizQuestion?.length ? <div className="score-board" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <h1>Result</h1>
                                <div id="res">
                                    <PieChart p={pie} />
                                    <div id="score-board">
                                        <div id="score-board">Score= {score}</div>
                                        <div id="score-board">Incorrect answer= {incorrect}</div>
                                        <div id="score-board">Correct answer= {correct}</div>
                                        <div id="score-board">Partial-Correct answer= {partial}</div>
                                        <div id="score-board">Unattampted answer= {unattampted}</div>
                                    </div>
                                </div>
                            </div>
                                : <div></div>
                        }
                    </div >
            }
        </div >
    )
}

export default Quiz
