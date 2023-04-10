import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { auth, firestore } from './firebase'
import User from './pages/User'
import Profile from './pages/Profile'
import Create from './pages/CreateQuiz'
import Quiz from './pages/Quiz'
import EditQuiz from './pages/EditQuiz';
import { getDoc, doc } from 'firebase/firestore'
import Progress from './pages/Progress'
import ReportIssue from './pages/ReportIssue';
import Forgot from './pages/Forgot';
// import Chart from './components/PieChart';
// import Timer from './components/Timer';
import Clock from './components/Clock';
export default function App() {
  const [user1, setUser] = useState('');
  const [keys, setKeys] = useState({ val: [] });
  const [c, setC] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
    get();

  }, [])
  const get = async () => {
    const document = await getDoc(doc(firestore, 'creaters', user1.uid))
    if (document.exists()) {
      const key = document.data().quizs;
      key?.map((k) => {
        let arr = keys.val;
        arr.push(k);
        setKeys({ ...keys, arr });
      })
    }
  }
  return (
    <div className="App">
      <Router basename='/Quizania'>
        <Routes >
          <Route path='/Quizania' element={<Home />} />
          {
            user1 !== null ? <Route path={'/' + user1.uid} element={<User props={[user1, setC, setCode]} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={'/profile=' + user1.uid} element={<Profile props={user1} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={'/profile=' + user1.uid + '/create=true'} element={<Create props={user1} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={"/edit=" + user1.uid + "/Quiz=edit"} element={<EditQuiz p={[user1, c]} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={"/play=" + user1.uid} element={<Quiz p={[user1, code]} />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={"/profile=" + user1.uid + '/progress'} element={<Progress />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 !== null ? <Route path={"/report/" + user1.uid} element={<ReportIssue />} /> : <Route path='/' element={<Home />} />
          }
          {
            user1 === null ? <Route path={"/forgot=true?"} element={<Forgot />} /> : <Route path='/' element={<Home />} />
          }
        </Routes>
      </Router>
    </div>
  );
}

