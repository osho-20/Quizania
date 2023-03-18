import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Background from '../component/config/Projects'
function Projects() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'PROJECTS',
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
export default Projects;
