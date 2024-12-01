import React from 'react';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from 'recharts';

import { useChart } from '../../context/chart-context';

export default function CrashChart() {
  const { isCrashed, crashPoint, chartData } = useChart();

  return (
    <div className="flex flex-col items-center justify-center p-5 box-border">
      <CrashChartBar
        data={chartData}
        crashPoint={crashPoint}
        isCrashed={isCrashed}
      />
    </div>
  );
}

function CrashChartBar({ data, crashPoint }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time', position: 'insideBottom' }}
          />
          <YAxis
            label={{ value: 'Multiplier', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar
            dataKey="multiplier"
            fill="#82ca9d"
            isAnimationActive={false}
            label={{ position: 'top' }}
          />
          {crashPoint && (
            <Line
              type="monotone"
              dataKey={() => crashPoint}
              stroke="red"
              fill="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
