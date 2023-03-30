import React from 'react'
import Header from '../components/HeaderProfile'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Slider from '../components/slider'
import { Link } from 'react-router-dom'
const User = (props) => {
    console.log(props);
    const navg = useNavigate();
    const auth = getAuth();
    console.log(auth.currentUser);
    if (auth.currentUser.emailVerified === false) {
        alert('First verify your Email.');
        navg('/');
    }
    return (
        <div>
            <Header p={props} />
            <div className="Quiz">
                <div className="quiz-box">
                    <h1>Create Quiz</h1>
                    <p>Press on Create to create a quiz</p>
                    <Link to={'/profile=' + auth.currentUser.uid + '/create=true'}><button type="submit" id="user-page-button">Create</button></Link>
                </div>
                <div className="quiz-box">
                    <h1> Start quiz</h1>
                    <label style={{ color: "#541690" }}>Enter code</label>
                    <input placeholder='Enter your code'></input>
                    <button type="submit" id="user-page-button">Submit</button>
                </div>
            </div>
            <div className='slider'>
                <Slider />
            </div>
        </div>
    )
}

export default User;
