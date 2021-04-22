import { useEffect, useState } from 'react';
import useStyles from './styles';

// material-ui core
import {
  Button,
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

// services
import { readDashboard } from 'services';

// utils
import { currency } from 'utils';

function Dashboard() {
  const classes = useStyles();

  const [type, setType] = useState('product');
  const [data, setData] = useState(null);

  useEffect(() => {
    readDashboard(type).then(res => {
      setData(res.data.data);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-type">Type</InputLabel>
          <Select
            labelId="select-type"
            id="select-type"
            value={type}
            onChange={e => setType(e.target.value)}
            label="Type">
            <MenuItem value="product">Produk</MenuItem>
            <MenuItem value="service">Jasa</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnLihat}
          onClick={() => {
            readDashboard(type).then(res => setData(res.data.data));
          }}>
          Lihat
        </Button>
      </div>
      <div className={classes.main}>
        <div className={classes.itemCharts}>
          <BarApexChart
            options={{
              chart: {
                type: 'bar'
              },
              xaxis: {
                categories: data
                  ? data.topMerchants?.map(toko => toko.name)
                  : []
              }
            }}
            series={[
              {
                name: 'Top',
                data: data
                  ? data.topMerchants?.map(toko => toko.totalOrder)
                  : []
              }
            ]}
          />
          <AreaApexChart
            options={{
              chart: {
                type: 'area'
              },
              xaxis: {
                categories: data
                  ? data.totalSalesPerMonth &&
                    Object.keys(data?.totalSalesPerMonth)
                  : []
              }
            }}
            series={[
              {
                name: 'Nilai',
                data: data
                  ? data.totalSalesPerMonth &&
                    Object.values(data?.totalSalesPerMonth)
                  : []
              }
            ]}
          />
        </div>

        <div className={classes.itemCard}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total pendapatan</p>
                  <p className={classes.nilai}>
                    {currency(data?.others?.totalIncome)}
                  </p>
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
                  <p className={classes.nilai}>{data?.others?.totalOrders}</p>
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
                  <p className={classes.nilai}>{data?.others?.totalUsers}</p>
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

export default Dashboard;
