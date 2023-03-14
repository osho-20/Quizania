import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header'
import Footer from './component/Footer'
import Content from './component/content'
import BackGround from './component/background'
function App() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  const [page, setPage] = useState({
    value: 'PORTFOLIO',
  })
  return (
    <div className="App">
      <BackGround />
      <header>
        <Header Page={{ page: page }} />
      </header>
      <section>
        <Content />
      </section>
      <footer id="footer">
        <Footer />
      </footer>

    </div>
  );
}

export default App;
