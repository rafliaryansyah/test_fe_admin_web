import { useEffect, useState } from 'react';
import useStyles from './styles';

// debounce
import { debounce } from 'debounce';

// material-ui core
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  List,
  ListItem
} from '@material-ui/core';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { Paginasi } from '../../../components';

// services
import { aktivitas } from 'services';

// utils
import { dateConverterRes } from 'utils';

function UserLogs() {
  const classes = useStyles();

  // paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [logAktivitas, setLogAktivitas] = useState([]);

  // read data aktivitas
  useEffect(() => {
    aktivitas().then(res => {
      setLogAktivitas(res.data.data);
      setLastPage(res.data.meta.last_page);
      setCurrentPage(res.data.meta.current_page);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <OutlinedInput
            name="cari"
            id="cari"
            color="primary"
            placeholder="Cari"
            onChange={debounce(e => {
              aktivitas(e.target.value).then(res => {
                setLogAktivitas(res.data.data);
                setLastPage(res.data.meta.last_page);
                setCurrentPage(res.data.meta.current_page);
              });
            }, 3000)}
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
          {logAktivitas?.map(log => (
            <ListItem key={log.id} button className={classes.item}>
              <div className={classes.desk}>
                <span className={classes.nama}>{log.causerUser}</span>
                <span className={classes.aksi}>{log.description}</span>
              </div>
              <span className={classes.date}>{dateConverterRes(log.date)}</span>
            </ListItem>
          ))}
        </List>
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) => {
          aktivitas('', value).then(res => {
            setLogAktivitas(res.data.data);
            setLastPage(res.data.meta.last_page);
            setCurrentPage(res.data.meta.current_page);
          });
        }}
      />
    </div>
  );
}

export default UserLogs;
