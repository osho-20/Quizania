import React, { useState } from 'react'
import Profile from './img/profile.jpeg'
import { Link } from 'react-router-dom'
import logo from './img/icon.png'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
const HeaderProfile = (props) => {
    const user = props.p;
    const [bar, setBar] = useState("burger-bar unclicked");
    const [menu, setMenu] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBar("burger-bar clicked");
            setMenu("menu visible");
        }
        else {
            setBar("burger-bar unclicked");
            setMenu("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    }
    const SignOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            window.location = '/Quizania/Quizania';
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <nav>
            <div className="header">
                <img src={logo} id="logo" />
                <h1>Quizania</h1>
                <div className='wrapper'>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="toggle">
                            <div className="burger">
                                <div onClick={updateMenu} style={{ width: '45px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                    <span className={bar} ></span>
                                    <span className={bar} ></span>
                                    <span className={bar} ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="trans">
                <ul className={menu} style={{ position: 'relative', zIndex: '1' }} >
                    <li className="menu1" style={{ fontSize: '25px', paddingBottom: '35px' }}>Welcome</li>
                    <li className="menu-profile" ><img src={auth.currentUser.photoURL !== null ? auth.currentUser.photoURL : Profile} alt={Profile} id="profilephoto" /><span class="caption">{user.displayName.toUpperCase()}</span></li>
                    <li className="menu1" id="hover-underline-animation" ><Link to={'/profile=' + user.displayName} className="link-css" >Profile</Link></li>
                    <li className="menu1" id="hover-underline-animation"><Link to={'/user=' + user.displayName} className="link-css" >Home</Link></li>
                    <li className="menu1" id="hover-underline-animation"><Link to={'/profile=' + user.displayName + '/progress'} className="link-css" >Progress</Link></li>
                    <li className="menu1" id="hover-underline-animation"><Link to={'/report/' + user.uid} className="link-css" >Report Issue</Link></li>
                    <li className="menu1" ><button id="signout" onClick={SignOut}>Log Out</button></li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderProfile
