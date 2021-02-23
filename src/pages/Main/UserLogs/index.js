import { useEffect, useState } from 'react';
import useStyles from './styles';

// material-ui core
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  List,
  ListItem
} from '@material-ui/core';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { Paginasi } from '../../../components';

// services
import { aktivitas } from 'services';

function UserLogs() {
  const classes = useStyles();

  const [setLogAktivitas] = useState([]);

  // read data aktivitas
  useEffect(() => {
    aktivitas().then(res => setLogAktivitas(res.data.data));
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-status">Semua Status</InputLabel>
          <Select
            labelId="select-status"
            name="select-status"
            id="select-status"
            // onChange={e => {
            //
            // }}
            label="Semua Status">
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="1">Waiting</MenuItem>
            <MenuItem value="2">Approved</MenuItem>
            <MenuItem value="3">Rejected</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            // onChange={e =>
            //
            // }
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.main}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button className={classes.item}>
            <div className={classes.desk}>
              <span className={classes.nama}>alex pratama</span>
              <span className={classes.aksi}>menonaktifkan produk</span>
              <span className={classes.ket}>Narkoboy</span>
            </div>
            <span className={classes.date}>1 Desember 2020, 17:10</span>
          </ListItem>
        </List>
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
}

export default UserLogs;
