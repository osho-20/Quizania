import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { ref, getDatabase, onValue } from 'firebase/database'
import Header from '../components/HeaderProfile'
const Result = (props) => {
    const db = getDatabase();
    const [res, setRes] = useState();
    useEffect(() => {
        const doc = ref(db, 'Questions/' + props.p);
        onValue(doc, (snap) => {
            setRes(snap.val().Result);
        })
    }, []);
    if (props.p === '') {
        window.location = '/Quizania/user=' + auth.currentUser.displayName;
    }
    let i = 0;
    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/Quizania/user=' + auth.currentUser.displayName;
        }, 0);
        window.onbeforeunload = null;
    }
    return (
        <div>
            <Header p={auth.currentUser} />
            <h1 style={{ color: 'white', fontWeight: '200' }}>Results</h1>
            <div id="outer-table">
                <table id="table">
                    <tr>
                        <th id='column-sn'>S.No </th>
                        <th id='column'>Name </th>
                        <th id='column'> Email</th>
                        <th id='column'>Score</th>
                    </tr>
                    {
                        res !== undefined ? Object.entries(res)?.map(([key, val]) => {
                            i = i + 1;
                            return (
                                <tr>
                                    <th id='column-sn'>{i} </th>
                                    <th id='column'>{val.name} </th>
                                    <th id='column'> {val.email}</th>
                                    <th id='column'>{val.score}   {' / '} {val?.totalmarks}</th>
                                </tr>
                            )

                        }) : <div></div>
                    }
                </table>
            </div>
        </div>
    )
}

export default Result
