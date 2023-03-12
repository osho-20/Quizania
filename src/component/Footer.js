import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
export default function Footer() {
    return (
        <div>
            <nav>
                <ul className="bg">
                    <li id="twitter">
                        <div><a className="icon" href="https://twitter.com/osho_2000" target="_blank"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></div>
                    </li>
                    <li id="linkedin">
                        <div><a className="icon" href="https://www.linkedin.com/in/yashjain027/" target="_blank"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></div>
                    </li>
                    <li id="github">
                        <div><a className="icon" href="https://github.com/osho-20" target="_blank"><FontAwesomeIcon icon={faGithub} size="2x" /></a></div>
                    </li>
                    <li id="instagram">
                        <div><a className="icon" href="https://www.instagram.com/osho_jain1/" target="_blank"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></div>
                    </li>
                    <li id="facebook">
                        <div><a className="icon" href="https://www.facebook.com/yash.jain.1401933/" target="_blank"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></div>
                    </li>
                </ul>
            </nav>
        </div >
    )
}
