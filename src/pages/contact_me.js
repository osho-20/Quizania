import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Background from '../component/config/Contactbg'
function Contact() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'CONTACT ME',
  })
  return (
    <div className="App">
      <header>
        <Header Page={{ page: page }} />
      </header>
      <section>
        <Background />
      </section>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Contact;
