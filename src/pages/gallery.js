import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Background from '../component/config/Gallerybg'
import Slid from '../component/slider'
import CC from '../component/images/codechef.png';
import CF from '../component/images/codeforces.png';
import IB from '../component/images/interviewbit.png';
import LC from '../component/images/leetcode.png';
import CN from '../component/images/coding_ninja.png';
import Slid2 from '../component/interestSlides'
function Gallery() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'GALLERY',
    interest1: 'space',
    interest2: 'blockchain',
    interest3: 'sports',
    interest4: 'movies',
    interest5: 'stocks',
  })
  return (
    <div className="App">
      <header>
        <Header Page={{ page: page }} />
      </header>
      <section>
        <Background />
        <div >
          <div id="main-heading">
            <h1>My Coding Profiles</h1>
          </div>
          <div className="sl">
            <Slid Img={{ CC, CF, IB, LC, CN }} />
          </div>
          <div id="main-heading">
            <h1>My Interest Fields</h1>
          </div>
          <div>
            <div id="gallery-heading">
              <p>Space Science</p>
            </div>
            <div className="sl">
              <Slid2 I={{ ins: page.interest1 }} />
            </div>
            <div id="gallery-heading">
              <p>Stock Market</p>
            </div>
            <div className="sl">
              <Slid2 I={{ ins: page.interest5 }} />
            </div>
            <div id="gallery-heading">
              <p>Movies</p>
            </div>
            <div className="sl">
              <Slid2 I={{ ins: page.interest4 }} />
            </div>
            <div id="gallery-heading">
              <p>Sports</p>
            </div>
            <div className="sl">
              <Slid2 I={{ ins: page.interest3 }} />
            </div>
            <div id="gallery-heading">
              <p>Block Chain</p>
            </div>
            <div className="sl">
              <Slid2 I={{ ins: page.interest2 }} />
            </div>
          </div>
        </div>
      </section >
      <footer className="footer" style={{ position: 'relative' }}>
        <Footer />
      </footer>
    </div >
  );
}

export default Gallery;
