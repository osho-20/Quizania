import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Slider from '../components/slider'
import { Link } from 'react-router-dom'
const User = (props) => {
    const prop = props.props[0];
    const navg = useNavigate();
    const auth = getAuth();
    const [code, setCode] = useState('');

    if (auth.currentUser.emailVerified === false) {
        alert('First verify your Email.');
        navg('/');
    }
    const submit = () => {
        props.props[2](code);
        navg('/play=' + auth.currentUser.uid);
    }
    return (
        <div>
            <Header p={prop} />
            <div className="Quiz">
                <div className="quiz-box">
                    <h1>Create Quiz</h1>
                    <p >Press on Create to create a quiz</p>
                    <Link to={'/profile=' + auth.currentUser.uid + '/create=true'}><button type="submit" id="user-page-button">Create</button></Link>
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
