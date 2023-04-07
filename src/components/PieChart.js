import React, { useEffect } from 'react'
import { PieChart as Piechart, Pie } from 'recharts'
import { auth, firestore } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
const PieChart = (props) => {
  useEffect(() => {
    const document = doc(firestore, 'creaters', auth.currentUser.uid);
    let arr = props.p[0];
    if (arr.length === 4) {
      arr.push({ 'score': props.p[2] });
    }
    console.log(arr);
    updateDoc(document, {
      progress: { [props.p[1]]: arr },
    });
  }, []);
  return (
    <div>
      <Piechart width={350} height={350}>
        <Pie data={props.p[0]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label="name" />
      </Piechart>
    </div>
  )
}

export default PieChart
