import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import Input from '../components/Input';
import PieChart from '../components/PieChart';
const Quiz = (props) => {
    const db = getDatabase();
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
    const [pie, setPie] = ({});
    const [res, setRes] = (0);
    useEffect(() => {
        const doc = ref(db, 'Questions/' + props.p[1]);

        onValue(doc, (snap) => {
            const q = snap.val();
            setData(q);
            const key = q.key;
            console.log(key);
            const doc1 = ref(db, 'Quiz/' + key);
            onValue(doc1, (snap) => {
                const q = snap.val();
                console.log('data= ', q);
                console.log('key= ', key);
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
        if (count > 0) {
            let marksperoption = ans.length;
            if (count !== marksperoption) {
                setPartial(partial + 1);
            }
            else {
                setCorrect(correct + 1);
            }
            marksperoption = (data.QuizQuestion[id].marks / marksperoption) * count;

            console.log(count, marksperoption)
            setScore(score + marksperoption);
        }
        else if (count === 0) {
            setUnattampted(unattampted + 1);
        }
        else {
            setIncorrect(incorrect + 1);
        }
        if (id === data?.QuizQuestion?.length) {
            setRes(1);
            setPie({ incorrect, correct, unattampted, partial });
        }
        setId(id + 1);
        setOpt({});
    }
    const startquiz = (e) => {
        e.preventDefault();
        setStart(1);
    }
    console.log('general ', gen);
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
                                                        id === data?.QuizQuestion?.length ? <button id="quiz-submit-button" onClick={submit}>Submit Answer</button> : <button id="quiz-submit-button" onClick={submit}>Submit and End</button>
                                                    }
                                                </div> : <div style={{ height: '0px', width: '0px' }}></div>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            res === 1 ? <div className="score-board" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <h1>Result</h1>
                                <div>
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