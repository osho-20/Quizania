import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header'
import Footer from '../component/Footer'
function About() {
    useEffect(() => {
        document.title = 'Home';
    }, [])
    const [page, setPage] = useState({
        value: 'ABOUT ME',
    })
    return (
        <div className="App">
            <header>
                <Header Page={{ page: page }} />
            </header>
            <section>
            </section>
            <footer id="footer">
                <Footer />
            </footer>
        </div>
    );
}

export default About;
