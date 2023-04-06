import React from 'react'
import { PieChart as Piechart, Pie, Cell, Tooltip, Legend } from 'recharts'
const PieChart = (props) => {
  console.log(props);
  return (
    <div>
      <Piechart width={300} height={300}>
        <Pie data={props.p} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label="name" />
      </Piechart>
    </div>
  )
}

export default PieChart
