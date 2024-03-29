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
import Result from './pages/Result';
export default function App() {
  const [user1, setUser] = useState('');
  const [keys, setKeys] = useState({ val: [] });
  const [c, setC] = useState('');
  const [code, setCode] = useState('');
  const [res, setRes] = useState('');
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
          <Route path={'/user=' + user1?.displayName} element={<User props={[user1, setC, setCode, setRes]} />} />
          <Route path={'/profile=' + user1?.displayName} element={<Profile props={user1} />} />
          <Route path={'/profile=' + user1?.displayName + '/create=true'} element={<Create props={user1} />} />
          <Route path={"/edit=" + user1?.displayName + '/' + c + '/Quiz=edit'} element={<EditQuiz p={[user1, c]} />} />
          <Route path={"/play=" + user1?.uid} element={<Quiz p={[user1, code]} />} />
          <Route path={"/profile=" + user1?.displayName + '/progress'} element={<Progress />} />
          <Route path={"/report/" + user1?.uid} element={<ReportIssue />} />
          <Route path={"/forgot"} element={<Forgot />} />
          <Route path={"/result=true"} element={<Result p={res} />} />
          <Route path={'/*'} element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

