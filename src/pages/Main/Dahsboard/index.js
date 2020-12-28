import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';

// material-ui icons
import { Money } from '@material-ui/icons';

// components
import { BarApexChart, AreaApexChart } from 'components';

// redux
import { connect } from 'react-redux';
import { setDashboard } from 'modules';

// services
import { readDashboard } from 'services';

function Dashboard({ setDataDashboard, dataDashboard }) {
  const classes = useStyles();

  // bar chart
  const [bar, setBar] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [
          'Sanjaya Store',
          'Pet Carez',
          'Clean Freak',
          'Chips Factory',
          'Toy Haven'
        ]
      }
    },
    series: [
      {
        name: 'Top',
        data: [30, 40, 45, 70, 91]
      }
    ]
  });

  // area chart
  const [area, setArea] = useState({
    options: {
      chart: {
        id: 'basic-area'
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Okt',
          'Nov',
          'Des'
        ]
      }
    },
    series: [
      {
        name: 'Nilai',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ]
  });

  useEffect(() => {
    readDashboard()
      .then(res => setDataDashboard(res.data.data))
      .catch(err => err);
  }, []);

  console.log('data : ', dataDashboard);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-role">bulan</InputLabel>
          <Select
            labelId="select-role"
            id="select-role"
            value="Januari"
            // onChange={handleChange}
            label="Semua Role">
            <MenuItem value="Januari">Januari</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.main}>
        <div className={classes.itemCharts}>
          <BarApexChart options={bar.options} series={bar.series} />
          <AreaApexChart options={area.options} series={area.series} />
        </div>

        <div className={classes.itemCard}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total pendapatan</p>
                  <p className={classes.nilai}>Rp.64.100.000</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total order</p>
                  <p className={classes.nilai}>2575</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total pengguna</p>
                  <p className={classes.nilai}>3743</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  setDataDashboard: propTypes.func,
  dataDashboard: propTypes.object
};

const mapStateToProps = state => ({
  dataDashboard: state.dashboard.dashboard
});

const mapDispatchToProps = dispatch => ({
  setDataDashboard: value => dispatch(setDashboard(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
