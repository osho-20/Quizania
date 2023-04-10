import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Slider from '../components/slider'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getDatabase, ref, onValue, get } from 'firebase/database'
const User = (props) => {
    const prop = props.props[0];
    const navg = useNavigate();
    const auth = getAuth();
    const [code, setCode] = useState('');
    const db = getDatabase();
    const submit = async (e) => {
        e.preventDefault();
        const doc = ref(db, 'Questions/' + code);
        onValue(doc, async (snap) => {
            const q = snap.val();
            console.log('q= ',q);
            if (q === null || q.QuizQuestion === undefined) {
                Swal.fire(
                    'Empty!',
                    'Please Enter Correct Code',
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
                    <Link to={'/profile=' + auth.currentUser.uid + '/create=true'} style={{ textDecoration: 'none' }}><button type="submit" id="user-page-button">Create</button></Link>
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
