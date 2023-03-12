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
                    <li className="menu1"><a href="about.html">ABOUT ME</a></li>
                    <li className="menu1"><a href="project.html">PROJECTS</a></li>
                    <li className="menu1"><a href="gallery.html">GALLERY</a></li>
                    <li className="menu1"><a href="contact.html">CONTACT ME</a></li>
                </ul>
            </div>
        </div >
    )
}

