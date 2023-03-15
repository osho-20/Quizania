import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Background from '../component/config/Gallerybg'
function Gallery() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'GALLERY',
  })
  return (
    <div className="App">
      <header>
        <Header Page={{ page: page }} />
      </header>
      <section>
        <Background />
      </section>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Gallery;
