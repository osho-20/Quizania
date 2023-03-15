import React, { useState } from 'react';
import '../App.css'
import ReactCardFlip from 'react-card-flip';
export default function Content() {
    const [isFlipped, setFlip] = useState(false);
    const click = () => {
        setFlip(!isFlipped);
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
                <div className="content_home" onClick={click} >
                    <h1>MSG from DEVELOPER</h1>
                    <p>Hello there, Myself Yash Jain, this is my Portfolio created and designed by me.
                        <br />Visit all the pages of this Portfolio... Hope you will like it.
                        <br />Would you like to connect to me?.. down there are some of my social media links given below.
                        <br />Just click on me to get more information about me and my career.
                        <br />You can also contact to just by going to contact page and leave a msg for me there.
                        <br />I will connect to you asap.
                    </p>
                </div>
                <div className="content_home" onClick={click} >
                    <p>Would you like to know more about my skills?...<br />Here is my resume link given below. <br /> Just click on the link.</p>
                    <p id="resume"><a href="https://drive.google.com/file/d/1ON8UixYq51JGIS63fvEgpEP8U5T-59wQ/view?usp=share_link" target="_blank"><b>RESUME...</b> </a></p>
                </div>
            </ReactCardFlip >
        </div >
    )
}

