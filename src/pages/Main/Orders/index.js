import { useState } from 'react';
import useStyles from './styles';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// material-ui icons
import SearchIcon from '@material-ui/icons/Search';

// components
import Paginasi from '../../../components/molecules/Paginasi';
import DetailDialog from '../../../components/molecules/DetailDialog';

function Orders({ history }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <div className={classes.filter}>
          <span className={classes.title}>filter</span>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            className={classes.select}>
            <Select name="filter" id="filter" value="filter">
              <MenuItem value="">Toko</MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.wrapperTable}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>No</th>
              <th className={classes.th}>Tipe</th>
              <th className={classes.th}>Toko</th>
              <th className={classes.th}>Tanggal Transaksi</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => setOpen(true)} className={classes.tr}>
              <td className={classes.td}>1</td>
              <td className={classes.td}>Produk</td>
              <td className={classes.td}>Photobook Indonesia</td>
              <td className={classes.td}>1 November 2020</td>
              <td className={classes.td}>Selesai</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginasi count={5} page={1} onClick={() => console.log('click')} />
      <DetailDialog open={open} close={() => setOpen(false)}></DetailDialog>
    </div>
  );
}

export default Orders;
