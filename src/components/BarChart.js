import React from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ErrorBar,
} from 'recharts';

const data = [
  {
    name: 'verbal',
    uv: 2000,
    pv: 2013,
    amt: 4500,
    time: 1,
    uvError: [100, 50],
    pvError: [110, 20]
  },
  {
    name: 'unsafe',
    uv: 3300,
    pv: 2000,
    amt: 6500,
    time: 2,
    uvError: 120,
    pvError: 50
  },
  {
    name: 'incidents',
    uv: 3200,
    pv: 1398,
    amt: 5000,
    time: 3,
    uvError: [120, 80],
    pvError: [200, 100]
  },
];

const colors = scaleOrdinal(schemeCategory10).range();

const BarChartComponent = () => {
  const handleBarAnimationStart = () => {
    console.log('Animation start');
  };

  const handleBarAnimationEnd = () => {
    console.log('Animation end');
  };

  const handlePvBarClick = (data, index, e) => {
    console.log(`Pv Bar (${index}) Click: `, data);
  };

  return (
    <BarChart
      width={400}
      height={400}
      data={data}
      onClick={handlePvBarClick}
    >
      <XAxis dataKey='name' />
      <YAxis yAxisId='a' />
      <YAxis yAxisId='b' orientation='right' />
      <Legend />
      <Tooltip />
      <CartesianGrid vertical={false} />
      <Bar
        yAxisId='a'
        dataKey='uv'
        onAnimationStart={handleBarAnimationStart}
        onAnimationEnd={handleBarAnimationEnd}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
        <ErrorBar dataKey='uvError' />
      </Bar>
      <Bar
        yAxisId='b'
        dataKey='pv'
        errorBar={{
          errorKey: 'pvError',
          width: 10,
          strokeWidth: 1,
          fill: 'black'
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
        <ErrorBar dataKey='pvError' />
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;
