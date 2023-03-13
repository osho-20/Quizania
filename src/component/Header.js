import React, { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
export default function Header() {
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
        <div style={{ height: '5em' }}>
            <nav class="toggle">
                <div class="burger">
                    <div onClick={updateMenu}>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                    </div>
                </div>
                <div class="title">PORTFOLIO</div>
            </nav>
            <div >
                <ul className={menu} >
                    <li className="menu1" ><Link className="a" to="/My-Portfolio">Home</Link></li>
                    <li className="menu1"><Link className="a" to="/about">About Me</Link></li>
                    <li className="menu1"><Link className="a" to="/projects">Projects</Link ></li>
                    <li className="menu1"><Link className="a" to="/gallery">Gallery</Link ></li>
                    <li className="menu1"><Link className="a" to="/contact">Contact Me</Link ></li>
                </ul>
            </div>
        </div >
    )
}

