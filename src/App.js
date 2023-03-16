import React, { useState } from 'react';
import './App.css';
import Header from './component/Header'
import Footer from './component/Footer'
import Content from './component/content'
import Particles from './component/config/Homebg'
export default function App() {
  const [page, setPage] = useState({
    value: 'PORTFOLIO',
  })
  return (
    <div className="App">
      <header>
        <Header Page={{ page: page }} />
      </header>
      <div id="content-wrap">
        <Particles />
        <Content />
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

