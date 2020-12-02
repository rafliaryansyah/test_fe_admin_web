import useStyles from './styles';

// material-ui core
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  List,
  ListItem
} from '@material-ui/core';

// material-ui icons
import { Search } from '@material-ui/icons';

// components
import { Paginasi } from '../../../components';

function UserLogs() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          margin="normal"
          className={classes.select}>
          <Select name="filter" id="filter" value="semua tanggal">
            <MenuItem value="semua tanggal">Semua Tanggal</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <Search />
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
