import React, { useState } from 'react'
import '../App.css'
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
        <div>
            <nav class="toggle">
                <div class="hamburger">
                    <div onClick={updateMenu}>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                    </div>
                </div>
                <div class="title"><b> PORTFOLIO</b></div>
            </nav>
            <ul className={menu} >
                <li className="menu"><b><a href="about.html">ABOUT ME</a></b></li>
                <li className="menu"><b><a href="project.html">PROJECTS</a></b></li>
                <li className="menu"><b><a href="gallery.html">GALLERY</a></b></li>
                <li className="menu"><b><a href="contact.html">CONTACT ME</a></b></li>
            </ul>
        </div >
    )
}

