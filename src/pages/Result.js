import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { ref, getDatabase, onValue } from 'firebase/database'
import Header from '../components/HeaderProfile'
const Result = (props) => {
    // const [key, setKey] = useState(props.p);
    const db = getDatabase();
    const [res, setRes] = useState();
    useEffect(() => {
        const doc = ref(db, 'Questions/' + props.p);
        onValue(doc, (snap) => {
            setRes(snap.val().Result);
        })
    }, []);
    if (props.p === '') {
        window.location = '/Quizania/' + auth.currentUser.uid;
    }
    let i = 0;
    console.log(res);
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
                            console.log('val=', val.name, key);
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
