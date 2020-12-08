// recharts
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// data
const data = [
  {
    name: 'Jan',
    nilai: 800
  },
  {
    name: 'Feb',
    nilai: 530
  },
  {
    name: 'Mar',
    nilai: 230
  },
  {
    name: 'Apr',
    nilai: 260
  },
  {
    name: 'Mei',
    nilai: 520
  },
  {
    name: 'Jun',
    nilai: 730
  },
  {
    name: 'Jul',
    nilai: 750
  },
  {
    name: 'Agu',
    nilai: 550
  },
  {
    name: 'Sep',
    nilai: 490
  },
  {
    name: 'Okt',
    nilai: 760
  },
  {
    name: 'Nov',
    nilai: 230
  },
  {
    name: 'Des',
    nilai: 480
  }
];

function SimpleAreaChart() {
  return (
    <ResponsiveContainer>
      <AreaChart
        width="100%"
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="nilai" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SimpleAreaChart;
