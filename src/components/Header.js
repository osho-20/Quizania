import React from 'react'
import logo from './img/icon.png'
const Header = () => {
    return (
        <div className="header">
            <img src={logo} id="logo"/>
            <h1>Quizania</h1>
            <ul className="menu">
                <li>About</li>
                <li>Connect</li>
            </ul>
        </div>
    )
}

export default Header
