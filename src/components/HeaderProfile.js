import React, { useState } from 'react'
import Profile from './img/profile.jpeg'
import { Link } from 'react-router-dom'
import logo from './img/icon.png'
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
    return (
        <nav>
            <div className="header">
                <img src={logo} id="logo" />
                <h1>Quizania</h1>
                {/* <div style={{ width: '20%' }}>
                <Link to={"/profile=" + user.uid}><img src={Profile} id="profilephoto" />
                <p className="name ">{user.displayName}</p>
            </div> */}
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
                    <li className="menu-profile" ><img src={Profile} alt={Profile} id="profilephoto" /><span class="caption">{user.displayName.toUpperCase()}</span></li>
                    <li className="menu1" id="hover-underline-animation" ><Link to={'/profile=' + user.uid} className="link-css" >Profile</Link></li>
                    <li className="menu1" id="hover-underline-animation"><Link to={'/profile=' + user.uid} className="link-css" >Progress</Link></li>
                    <li className="menu1" id="hover-underline-animation"><Link to={'/profile=' + user.uid} className="link-css" >Report Issue</Link></li>
                    <li className="menu1" ><button id="signout">Log Out</button></li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderProfile
