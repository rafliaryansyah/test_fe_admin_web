import useStyles from './styles';

// react chart js 2
import { Bar, Line } from 'react-chartjs-2';

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
import { useState } from 'react';

function Dashboard() {
  const classes = useStyles();

  const [dataBar, setDataBar] = useState([300, 290, 250, 240, 180]);
  const [dataLine, setDataLine] = useState([300, 290, 250, 240, 180]);

  // data for bar
  const dataChartForBar = {
    labels: [
      'Sanjaya Store',
      'Pet Carez',
      'Clean Freak',
      'Chips Factory',
      'Toy Haven'
    ],
    datasets: [
      {
        label: 'Top 5 Toko',
        data: dataBar,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // data for line
  const dataChartForLine = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des'
    ],
    datasets: [
      {
        label: 'Top 5 Toko',
        data: dataLine,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

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
        <div className={classes.itemCart}>
          <Bar
            data={dataChartForBar}
            width={100}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
          <Line
            data={dataChartForLine}
            width={100}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
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

export default Dashboard;
