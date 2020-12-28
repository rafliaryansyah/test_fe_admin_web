import useStyles from './styles';
import propTypes from 'prop-types';

// apex chart
import Chart from 'react-apexcharts';

function BarApexChart({ options, series }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Chart options={options} series={series} type="bar" />
    </div>
  );
}

BarApexChart.propTypes = {
  options: propTypes.object,
  series: propTypes.array
};

export default BarApexChart;
