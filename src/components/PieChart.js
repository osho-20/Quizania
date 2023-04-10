import React, { useEffect, useState } from 'react'
import { PieChart as Piechart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { auth, firestore } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, getDatabase, onValue } from 'firebase/database'
const PieChart = (props) => {
  const db = getDatabase();
  if (props.p[0].length === 5) {
    props.p[0].pop();
  }
  const COLORS = ["green", "red", "white", "blue"];
  const update = async (e) => {
    const document = doc(firestore, 'creaters', auth.currentUser.uid);
    let arr = props.p[0];
    let q;
    const docref = ref(db, 'Quiz/' + props.p[1]);
    onValue(docref, (snap) => {
      q = snap.val();
    });
    if (arr.length === 4) {
      arr.push({ 'score': props.p[2] });
    }
    if (arr.length === 5) {
      arr.push({ 'name': q.QuizName });
    }
    const doc1 = await getDoc(document);
    let arr1 = await doc1.data().progress;
    if (arr1 === undefined) {
      arr1 = {};
      arr1[props.p[1]] = arr;
    }
    else
      arr1[props.p[1]] = arr;
    await updateDoc(document, {
      progress: arr1,
    }).then((res) => {
      console.log('updated');
    });
  }
  useEffect(() => {
    if (props.p[3] === 1) {
      update();
    }
  }, []);
  return (
    <div>
      <Piechart width={730} height={400}>
        <Legend />
        <Pie data={props?.p[3] === 1 ? props?.p[0].slice(0, 4) : props?.p[0]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} fill="#8884d8" label="name" >
          <Cell key={'cell-' + '1'} fill={COLORS[1 % COLORS.length]} />
          <Cell key={'cell-' + '0'} fill={COLORS[0 % COLORS.length]} />
          <Cell key={'cell-' + '2'} fill={COLORS[2 % COLORS.length]} />
          <Cell key={'cell-' + '3'} fill={COLORS[3 % COLORS.length]} />
        </Pie>
      </Piechart>
    </div>
  )
}

export default PieChart
