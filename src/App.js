import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import { auth } from './firebase'
import User from './pages/User'
import Profile from './pages/Profile'
import Create from './pages/CreateQuiz'
export default function App() {
  const [user1, setUser] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Quizania' element={<Home />} />
          {
            user1 !== null ? <Route path={'/' + user1.uid} element={<User props={user1} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={'/profile=' + user1.uid} element={<Profile props={user1} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={'/profile=' + user1.uid + '/create=true'} element={<Create props={user1}/>} /> : <Route path='/' element={<Home />} />
          }
        </Routes>
      </Router>
    </div>
  );
}

