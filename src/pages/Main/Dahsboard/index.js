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

// react icons
import {
  IoCashOutline,
  IoCartOutline,
  IoPersonCircleOutline
} from 'react-icons/io5';

// components
import { BarApexChart, AreaApexChart } from 'components';

// redux
import { connect } from 'react-redux';
import { setDashboard } from 'modules';

// services
import { readDashboard } from 'services';

// utils
import { currency } from 'utils';

function Dashboard({ setDataDashboard }) {
  const classes = useStyles();

  // bar chart
  const [bar] = useState({
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
  const [area] = useState({
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
                  <p className={classes.nilai}>{currency(64100000)}</p>
                </div>
                <IoCashOutline size={65} />
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
                <IoCartOutline size={65} />
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
                <IoPersonCircleOutline size={65} />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  setDataDashboard: propTypes.func
};

const mapDispatchToProps = dispatch => ({
  setDataDashboard: value => dispatch(setDashboard(value))
});

export default connect(null, mapDispatchToProps)(Dashboard);
