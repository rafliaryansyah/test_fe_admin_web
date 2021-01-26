import useStyles from './styles';
import propTypes from 'prop-types';

// apex chart
import Chart from 'react-apexcharts';

function AreaApexChart({ options, series }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Chart options={options} series={series} type="area" />
    </div>
  );
}

AreaApexChart.propTypes = {
  options: propTypes.object,
  series: propTypes.array
};

export default AreaApexChart;
