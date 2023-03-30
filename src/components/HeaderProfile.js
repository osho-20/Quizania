import React from 'react'
import Profile from './img/profile.jpeg'
import { Link } from 'react-router-dom'
const HeaderProfile = (props) => {
    const user = props.p.props;
    return (
        <div className="header">
            <h1>Quizania</h1>
            <div style={{ width: '20%' }}>
                <Link to={"/profile=" + user.uid}><img src={Profile} id="profilephoto" /></Link>
                <p className="name ">{user.displayName}</p>
            </div>

        </div >
    )
}

export default HeaderProfile
