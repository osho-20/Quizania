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

function Gallery() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'GALLERY',
  })
  return (
    <div className="Gallery">
      <header>
        <Header Page={{ page: page }} />
      </header>
      <section>
        <Background />
        <div >
          <div className="gallery-heading">
            <p>My Coding Profiles</p>
          </div>
          <Slid Img={{ CC, CF, IB, LC }} />
        </div>
      </section>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Gallery;
