import React, { useState } from 'react';
import '../App.css'
import ReactCardFlip from 'react-card-flip';
import TypeWriter from 'typewriter-effect'
export default function Content() {
    const [isFlipped, setFlip] = useState(false);
    const click = () => {
        setFlip(!isFlipped);
    }
    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" >
                <div className="content_home" onClick={click} >
                    <h1><TypeWriter
                        options={{
                            strings: ['Hello there...', 'I\'m a Developer', 'I\'m a Programmer'],
                            autoStart: true,
                            loop: true,
                        }}
                    /></h1>
                    <p>I'm Yash Jain and I'd love for you to check out my portfolio. It's designed by me and showcases my work.
                        <br /> My portfolio highlights my skills and experience in various areas such as graphic design, web development, and content creation. I have included samples of my work, so you can get a better understanding of my capabilities.
                        <br /> Feel free to explore all the pages and connect with me via the social media links or the contact page.
                        <br />To access additional details about me, kindly click here.
                        <br />Thanks for visiting!
                    </p>
                </div>
                <div className="content_home" onClick={click} >
                    <p>I have shared my resume with you to provide more information about my skills...
                        <br />I have included the link below, please feel free to access it.</p>
                    <p id="resume"><a href="https://drive.google.com/file/d/1ON8UixYq51JGIS63fvEgpEP8U5T-59wQ/view?usp=share_link" target="_blank"><b><TypeWriter
                        options={{
                            strings: ['Resume...'],
                            autoStart: true,
                            loop: true,
                        }}
                    /></b> </a></p>
                </div>
            </ReactCardFlip >
        </div >
    )
}

