import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Input from '../components/Input';
import PieChart from '../components/PieChart';
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import Timer from '../components/Timer';
import Clock from '../components/Clock';
import Swal from 'sweetalert2';
import { firestore } from '../firebase';
import { doc as doce, getDoc } from 'firebase/firestore';
const Quiz = (props) => {
    console.log(props);
    if (props.p[1] === '') {
        window.location = 'Quizania/user=' + auth.currentUser.displayName;
    }
    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, []);
    const alertUser = e => {
        e.preventDefault()
        e.returnValue = 'Relodaing will erase all the changes';
    }
    const db = getDatabase();
    const [data, setData] = useState({});
    const [id, setId] = useState(0);
    const [opt, setOpt] = useState({});
    const [incorrect, setIncorrect] = useState(0);
    const [partial, setPartial] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [unattampted, setUnattampted] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [start, setStart] = useState(0);
    const [gen, setGen] = useState({});
    const [pie, setPie] = useState({});
    const [sttimer, setstTimer] = useState(0);
    const [color, setColor] = useState('white');
    const [displayres, setDisplayres] = useState(0);
    const [k, setk] = useState();
    const size = data?.QuizQuestion?.length;
    useEffect(() => {
        const doc = ref(db, 'Questions/' + props.p[1]);
        onValue(doc, async (snap) => {
            const q = snap.val();
            setData(q);
            const key = q.key;
            setk(key);
            const doc1 = ref(db, 'Quiz/' + key);
            const document = await getDoc(doce(firestore, 'creaters/' + auth.currentUser.uid));
            onValue(doc1, (snap) => {
                const q = snap.val();
                if (document?.data()?.progress !== undefined && document?.data()?.progress[key] !== undefined && document?.data()?.progress[key][7]?.attempts !== undefined) {
                    setAttempts(document?.data()?.progress[key][7]?.attempts);
                }
                setGen({
                    dt: q.DurationTime[0] + q.DurationTime[1] + ' hrs ' + q.DurationTime[3] + q.DurationTime[4] + ' mins',
                    et: q.EndTime.slice(0, 10) + ' at ' + q.EndTime.slice(11, 13) + ' hrs ' + q.EndTime.slice(14, 16) + ' mins',
                    qc: q.QuizCreater,
                    qd: q.QuizDescription,
                    qm: q.QuizMarks,
                    qn: q.QuizName,
                    st: q.StartTime,
                    tq: q.TotalQuestions,
                    qa: q.QuizAttempts,
                    qi: q.Quizid,
                    time: Number(q.DurationTime.slice(0, 2)) * 3600 + Number(q.DurationTime.slice(3, 5)) * 60,
                });
                const today = new Date();
                const date = today.getFullYear() + '-' + ((today.getMonth() + 1 < 10) ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
                const time = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
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
                    if (cyear < year) {
                        Swal.fire(
                            'Oops!',
                            'The quiz has not started yet.',
                            'error'
                        ).then(() => {
                            window.location = '/Quizania/user=' + auth.currentUser.displayName;
                        });
                    }
                    else if (cyear === year) {
                        if (cmonth < month) {
                            Swal.fire(
                                'Oops!',
                                'The quiz has not started yet.',
                                'error'
                            ).then(() => {
                                window.location = '/Quizania/user=' + auth.currentUser.displayName;
                            });
                        }
                        else if (cmonth === month) {
                            if (cdate < date) {
                                Swal.fire(
                                    'Oops!',
                                    'The quiz has not started yet.',
                                    'error'
                                ).then(() => {
                                    window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                });
                            }
                            else if (cdate === date) {
                                if (chrs < hrs) {
                                    Swal.fire(
                                        'Oops!',
                                        'The quiz has not started yet.',
                                        'error'
                                    ).then(() => {
                                        window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                    });
                                }
                                else if (chrs === hrs) {
                                    if (cmins < mins) {
                                        Swal.fire(
                                            'Oops!',
                                            'The quiz has not started yet.',
                                            'error'
                                        ).then(() => {
                                            window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                        });
                                    }
                                }
                            }
                        }
                    }
                };
                function CompareDateandEndtime(str1, strdate, strtime) {
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
                    if (cyear > year) {
                        Swal.fire(
                            'Oops!',
                            'The quiz is no more available.',
                            'error'
                        ).then(() => {
                            window.location = '/Quizania/user=' + auth.currentUser.displayName;

                        });
                    }
                    else if (cyear === year) {
                        if (cmonth > month) {
                            Swal.fire(
                                'Oops!',
                                'The quiz is no more available.',
                                'error'
                            ).then(() => {
                                window.location = '/Quizania/user=' + auth.currentUser.displayName;

                            });
                        }
                        else if (cmonth === month) {
                            if (cdate > date) {
                                Swal.fire(
                                    'Oops!',
                                    'The quiz is no more available.',
                                    'error'
                                ).then(() => {
                                    window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                });
                            }
                            else if (cdate === date) {
                                if (chrs > hrs) {
                                    Swal.fire(
                                        'Oops!',
                                        'The quiz is no more available.',
                                        'error'
                                    ).then(() => {
                                        window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                    });
                                }
                                else if (chrs === hrs) {
                                    if (cmins > mins) {
                                        Swal.fire(
                                            'Oops!',
                                            'The quiz is no more available.',
                                            'error'
                                        ).then(() => {
                                            window.location = '/Quizania/user=' + auth.currentUser.displayName;

                                        });
                                    }
                                }
                            }
                        }
                    }
                };
                CompareDateandtime(q.StartTime, date, time);
                CompareDateandEndtime(q.EndTime, date, time);
            })
        })

    }, []);
    const submit = async (e) => {
        e.preventDefault();
        const keys = Object.keys(opt);
        const ans = data.QuizQuestion[id].answer;
        let cnt = 0;
        for (const options of keys) {

            let count = ans.reduce((n, x) => n + (x === Number(options) + 1), 0);
            if (opt[options] === 1 && count > 0) {
                cnt = cnt + count;
            }
            else if (opt[options] === 1 && count === 0) {
                count = -1;
                cnt = -1;
                break;
            }
        }
        if (cnt > 0) {
            let marksperoption = ans.length;
            if (cnt !== marksperoption) {
                setPartial(partial + 1);
            }
            else {
                setCorrect(correct + 1);
            }
            marksperoption = (data.QuizQuestion[id].marks / marksperoption) * cnt;
            setScore(score + marksperoption);
        }
        else if (cnt === 0) {
            setUnattampted(unattampted + 1);
        }
        else {
            setIncorrect(incorrect + 1);
        }
        setId(id + 1);
        setOpt({});
    }
    const startquiz = (e) => {
        e.preventDefault();
        setstTimer(1);
    }
    const showResult = async (e) => {
        e.preventDefault();
        setDisplayres(1);
        let arr = [];
        arr.push({ name: 'Incorrect', value: incorrect });
        arr.push({ name: 'Correct', value: correct });
        arr.push({ name: 'Unattampted', value: unattampted });
        arr.push({ name: 'Partial', value: partial });
        const doc = ref(db, 'Questions/' + props.p[1]);
        onValue(doc, async (snap) => {
            const q = snap.val();
            let array = q.Result;
            if (array === undefined) {
                array = [];
            }
            array[auth.currentUser.uid] = {
                marking: arr,
                score,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                totalmarks: gen.qm,
            }
            update(doc, {
                Result: array,
            }).then((res) => {
            }).catch((err) => {
                console.log(err)
            });
        });
        setPie(arr);
        setOpt({});
    }
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
        event.preventDefault();
        window.history.pushState(null, document.title, window.location.href);
    });
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                start === 1 && displayres === 0 && id !== data?.QuizQuestion?.length ? <div><Clock q={[setId, size, gen.time]} /></div> : <p></p>
            }
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    start === 0 ?
                        <div id="instructions">
                            <h1>Instructions</h1>
                            <p>{gen?.qd}</p>
                            <ul style={{ textAlign: 'left' }}>
                                <li>Quiz contains total {gen?.tq} number of questions.</li>
                                <li>Quiz is of total {gen?.qm} marks.</li>
                                <li>You can attempt quiz {Number(gen?.qa) - attempts} times.</li>
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
                            {
                                sttimer === 0 ? < button id="start" onClick={startquiz}>Start</button> : <div id="center"><Timer seconds={[10, "starttimer", setStart, color, setColor]} /></div>
                            }
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
                                                            <p style={{ color: 'white', textAlign: 'left', fontSize: '30px' }}>{index + 1}. {get.description} ({get.marks} Marks)</p>
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
                                id === data?.QuizQuestion?.length ?
                                    <div className="score-board" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            displayres === 1 ? <div className="score-board" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                <h1>Result</h1>
                                                <div id="res">
                                                    <PieChart p={[pie, k, score, 1]} />
                                                    <div id="score-board-outer">
                                                        <h1 id="score-board-header">Score Board</h1>
                                                        <div id="score-board">
                                                            <div id="inner-label" style={{ width: '250px', textAlign: 'left' }}>Score</div>
                                                            <div style={{ width: '15px' }}>{score}</div>
                                                        </div>
                                                        <div id="score-board">
                                                            <div id="inner-label" style={{ width: '250px', textAlign: 'left' }}>Incorrect answer</div>
                                                            <div style={{ width: '15px' }}> {incorrect}</div>
                                                        </div>
                                                        <div id="score-board">
                                                            <div id="inner-label" style={{ width: '250px', textAlign: 'left' }}>Correct answer</div>
                                                            <div style={{ width: '15px' }}> {correct}</div>
                                                        </div>
                                                        <div id="score-board">
                                                            <div id="inner-label" style={{ width: '250px', textAlign: 'left' }}>Partial-Correct answer</div>
                                                            <div style={{ width: '15px' }}>{partial}</div>
                                                        </div>

                                                        <div id="score-board">
                                                            <div id="inner-label" style={{ width: '250px', textAlign: 'left' }}>Unattampted answer</div>
                                                            <div style={{ width: '15px' }}> {unattampted}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <Link to={'/user=' + auth.currentUser.displayName} id="return">Return to Homepage.</Link>
                                            </div> : <div className="score-board" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                <div id="score-board" style={{ margin: '20px', padding: '20px' }}>The quiz has Ended kindly click on result to view your result.</div>
                                                <div id="score-board"><button onClick={showResult}>Result</button></div>
                                            </div>
                                        }
                                    </div>
                                    : <div></div>
                            }
                        </div >
                }
            </div >
        </div>
    )
}

export default Quiz;
