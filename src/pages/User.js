import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { firestore } from '../firebase'
import Slider from '../components/slider'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getDatabase, ref, onValue } from 'firebase/database'
import { getDoc, doc as doc1 } from 'firebase/firestore'
const User = (props) => {
    const prop = props.props[0];
    const navg = useNavigate();
    const auth = getAuth();
    const [code, setCode] = useState('');
    const db = getDatabase();
    const submit = async (e) => {
        e.preventDefault();
        const doc = ref(db, 'Questions/' + code);
        const document = await getDoc(doc1(firestore, 'creaters/' + auth.currentUser.uid));
        onValue(doc, (snap) => {
            const q = snap.val();
            if (q === null || q.QuizQuestion === undefined) {
                Swal.fire(
                    'Wrong',
                    'Please Enter Correct Code',
                    'error'
                ).then((err) => {
                    console.log('err= ', err);
                })
            }
            else if (document?.data()?.progress !== undefined && document?.data()?.progress[q.key] !== undefined && document?.data()?.progress[q.key][7]?.attempts !== undefined && document?.data()?.progress[q.key] !== undefined && document?.data()?.progress[q.key][7]?.attempts >= q?.QuizAttempts) {
                Swal.fire(
                    'Sorry!',
                    'Your number of attempts is over.',
                    'info'
                ).then((err) => {
                    console.log('err= ', err);
                })
            }
            else {
                props.props[2](code);
                navg('/play=' + auth.currentUser.uid);
            }
        })
    }
    return (
        <div>
            <Header p={prop} />
            <div className="Quiz">
                <div className="quiz-box">
                    <h1>Create Quiz</h1>
                    <p >Press on Create to create a quiz</p>
                    <Link to={'/profile=' + auth.currentUser.displayName + '/create=true'} style={{ textDecoration: 'none' }}><button type="submit" id="user-page-button">Create</button></Link>
                </div>
                <div className="quiz-box">
                    <h1> Start quiz</h1>
                    <div id="enter-code">
                        <label style={{ color: "whitesmoke", fontWeight: '400', fontSize: '22px' }}>Enter code</label>
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder='Enter your code'></input>
                    </div>
                    <button type="submit" id="user-page-button" onClick={submit}>Submit</button>
                </div>
            </div>
            <div className='slider'>
                <Slider p={props} />
            </div>
        </div>
    )
}

export default User;
