// recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {
    name: 'Sanjaya Store',
    top: 330
  },
  {
    name: 'Pet Carez',
    top: 300
  },
  {
    name: 'Clean Freak',
    top: 240
  },
  {
    name: 'Chips Factory',
    top: 200
  },
  {
    name: 'Toy Haven',
    top: 180
  }
];

function SimpleBarChart() {
  return (
    <ResponsiveContainer>
      <BarChart
        width="100%"
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="top" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
