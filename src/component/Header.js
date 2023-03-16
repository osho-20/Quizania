import React, { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
export default function Header(props) {
    const title = props.Page.page.value;
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
    // const [title, setTitle] = useState('PORTFOLIO');
    // const updateTitle = (event) => {
    //     console.log(event.target.id);
    // }
    return (
        <div style={{ height: '5em' }}>
            <nav className="toggle">
                <div className="burger">
                    <div onClick={updateMenu}>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                        <span className={bar} ></span>
                    </div>
                </div>
                <div className="title">{title}</div>
            </nav>
            <div className="trans">
                <ul className={menu} style={{ position: 'relative', zIndex: '1' }} >
                    <li className="menu1" ><Link className="a" to="/" id="PORTFOLIO" >Home</Link></li>
                    <li className="menu1" ><Link className="a" to="/about" id="ABOUT ME">About Me</Link></li>
                    <li className="menu1" ><Link className="a" to="/projects" id="PROJECTS">Projects</Link ></li>
                    <li className="menu1" ><Link className="a" to="/gallery" id="GALLERY">Gallery</Link ></li>
                    <li className="menu1" ><Link className="a" to="/contact" id="CONTACT ME">Contact Me</Link ></li>
                </ul>
            </div>
        </div >
    )
}

