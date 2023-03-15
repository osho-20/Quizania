import React, { useState } from 'react';
import { Route} from 'react-router-dom';
import '../App.css'
export default function Content() {
    return (
        <div style={{ textAlign: 'center' }}>
            <div class="content_home">
                <h1>DEVELOPER</h1>
                <p>Hello Myself Yash Jain, Currently working on my front-end / Back-end skills and learning new things every day. Knows UI/UX designing.
                    Good in problem solving and puzzles. My skills consist of C/C++, JAVA, Python, Go, MySql, Linux, HTML, CSS and React.</p>
                <p id="resume"><a href="#" target="_blank"><b>RESUME</b> </a></p>
            </div>
        </div >
    )
}

