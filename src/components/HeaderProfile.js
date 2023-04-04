import React from 'react'
import Profile from './img/profile.jpeg'
import { Link } from 'react-router-dom'
import logo from './img/icon.png'
const HeaderProfile = (props) => {
    const user = props.p;
    return (
        <div className="header">
            <img src={logo} id="logo" />
            <h1>Quizania</h1>
            <div style={{ width: '20%' }}>
                <Link to={"/profile=" + user.uid}><img src={Profile} id="profilephoto" /></Link>
                <p className="name ">{user.displayName}</p>
            </div>

        </div >
    )
}

export default HeaderProfile
