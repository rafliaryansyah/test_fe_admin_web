import useStyles from './styles';
import { useParams } from 'react-router-dom';

// material-ui core
import {
  Avatar,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';

// services
import { getStoreReporting } from 'services';
import { useState } from 'react';

// utils
import { currency } from 'utils';

function Report() {
  const classes = useStyles();
  const { id } = useParams();
  const nameMonth = [
    '',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const listMonths = () => {
    var list = [];
    for (let index = 1; index < 13; index++) {
      list.push(index);
    }
    return list;
  };

  const listYears = () => {
    var now = new Date().getFullYear();
    var list = [];
    for (let index = 2019; index <= now; index++) {
      list.push(index);
    }
    return list;
  };

  // input select value
  const [type, setType] = useState('product');
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2021);

  // data reporting toko
  const [data, setData] = useState(null);

  const getReporting = async () => {
    await getStoreReporting(id, type, month, year).then(res =>
      setData(res.data.data)
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <div className={classes.selections}>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}>
            <InputLabel id="select-role">Tipe</InputLabel>
            <Select
              labelId="select-type"
              id="select-type"
              label="Bulan"
              value={type}
              onChange={e => setType(e.target.value)}>
              {['product', 'service'].map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}>
            <InputLabel id="select-role">Bulan</InputLabel>
            <Select
              labelId="select-month"
              id="select-month"
              label="Bulan"
              value={month}
              onChange={e => setMonth(e.target.value)}>
              {listMonths().map((month, i) => (
                <MenuItem key={i} value={month}>
                  {nameMonth[month]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}>
            <InputLabel id="select-role">Tahun</InputLabel>
            <Select
              labelId="select-year"
              id="select-year"
              label="Tahun"
              value={year}
              onChange={e => setYear(e.target.value)}>
              {listYears().map((year, i) => (
                <MenuItem key={i} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.buttons}>
          <Button
            onClick={getReporting}
            variant="contained"
            color="primary"
            disabled={type && month && year ? false : true}
            className={classes.button}>
            lihat report
          </Button>
        </div>
      </div>
      <div className={classes.report}>
        <div className={classes.gridCard}>
          {data?.reports?.map((report, i) => (
            <div key={i} className={classes.cardReport}>
              <label className={classes.date}>
                Bulan {nameMonth[data?.month]}
              </label>
              {report.items?.map((item, i) => (
                <div key={i} className={classes.card}>
                  <Avatar
                    alt={item.name}
                    src={item.image}
                    variant="rounded"
                    className={classes.avatar}
                  />
                  <div className={classes.descCard}>
                    <span className={classes.nama}>{item.name}</span>
                    <span className={classes.harga}>
                      {currency(item.price)}
                    </span>
                    <div className={classes.wrapperTerjual}>
                      <span className={classes.labelTerjual}>
                        terjual: {item.quantity}
                      </span>
                      <span className={classes.total}>
                        total: {currency(report.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className={classes.wrapperTotalPenjualan}>
                <label className={classes.labelTotalPenjualan}>
                  total penjualan
                </label>
                <span className={classes.totalPenjualan}>
                  {currency(data?.total?.totalSales)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={classes.wrapperInfo}>
          <div className={classes.input}>
            <label className={classes.label}>total penjualan</label>
            <span className={classes.text}>
              {currency(data?.total?.totalSales)}
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>potongan admin</label>
            {data?.total?.adminRate !== 0 ? (
              <span className={classes.text}>{data?.total?.adminRate}%</span>
            ) : (
              <span className={classes.text}>0%</span>
            )}
          </div>
          <div className={classes.input}>
            <label className={classes.label}>nominal potongan</label>
            <span className={classes.text}>
              {currency(data?.total?.nominalRate)}
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>total penjualan bersih</label>
            <span className={classes.text}>
              {currency(data?.total?.netSales)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
