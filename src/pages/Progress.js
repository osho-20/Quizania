import React, { useState, useEffect } from 'react'
import Header from '../components/HeaderProfile'
import { auth, firestore } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { getDatabase, ref, onValue } from 'firebase/database'
import PieChart from '../components/PieChart'
import down from '../components/img/download.png'
const Progress = () => {
  const db = getDatabase();
  const [progress, setProgress] = useState({});
  const [cont, setCont] = useState('container');
  const [pie, setPie] = useState({});
  // const [c, setc] = useState(0);
  // const [i, seti] = useState(0);
  // const [u, setu] = useState(0);
  // const [p, setp] = useState(0);
  useEffect(() => {
    const get = async () => {
      const document = await getDoc(doc(firestore, 'creaters', auth.currentUser.uid));
      let q = await document.data().progress;
      setProgress(q);
      let c = 0, i = 0, u = 0, p = 0;
      Object.entries(q).map(([key, value]) => {
        c = c + value[1].value;
        i = i + value[0].value;
        u = u + value[2].value;
        p = p + value[3].value;
      });
      let arr = [];
      arr.push({ name: 'Incorrect', value: i });
      arr.push({ name: 'Correct', value: c });
      arr.push({ name: 'Unattampted', value: u });
      arr.push({ name: 'Partial', value: p });
      setPie(arr);
    }
    get();
  }, []);
  const [k, setK] = useState('');
  const change = (e) => {
    if (cont === 'container')
      setCont('container1');
    else
      setCont('container');
  }
  return (
    <div>
      <Header p={auth.currentUser} />
      <div id="progress">
        <div>
          <PieChart p={[pie, '', 0, 1]} />
          <h1 id="pie-heading">Pie Chart </h1>
        </div>
        <div id="outer-container">
          {
            Object.entries(progress)?.map(([key, prog]) => {
              return (
                <div id="inner-container">
                  <div id="quiz-name" onClick={() => { change(); k === key ? setK('') : setK(key); }}>
                    {prog[5].name.toUpperCase()}
                    <img src={down} id="down" />
                  </div>
                  <div id={k === key ? 'container1' : 'container'}>
                    <div id="row">
                      <li id="each-progress">{prog[0].name} </li>
                      <li id="each-progress1">{prog[0].value}</li>
                    </div>
                    <div id="row">
                      <li id="each-progress">{prog[1].name} </li>
                      <li id="each-progress1">{prog[1].value}</li>
                    </div>
                    <div id="row">
                      <li id="each-progress">{prog[2].name} </li>
                      <li id="each-progress1">{prog[2].value}</li>
                    </div>
                    <div id="row">
                      <li id="each-progress">{prog[3].name} </li>
                      <li id="each-progress1">{prog[3].value}</li>
                    </div>
                    <div id="row">
                      <li id="each-progress">Score</li>
                      <li id="each-progress1"> {prog[4].score}</li>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div >
  )
};
export default Progress;
