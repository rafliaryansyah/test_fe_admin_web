import { useEffect, useState } from 'react';
import useStyles from './styles';

// debonce untuk fitur pencarian
import { debounce } from 'debounce';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { CardToko, Paginasi } from 'components';

// services
import { getStores } from 'services';

// utils
import { dateConverterRes } from 'utils';

const ListToko = ({ history }) => {
  const classes = useStyles();

  // data paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data stores
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores().then(res => {
      setStores(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    });
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
            onChange={e => {
              getStores(parseInt(e.target.value)).then(res => {
                setStores(res.data.data);
              });
            }}
            label="Semua Status">
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="1">Waiting</MenuItem>
            <MenuItem value="2">Approved</MenuItem>
            <MenuItem value="3">Rejected</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            onChange={debounce(e => {
              getStores('', e.target.value).then(res => {
                setStores(res.data.data);
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

      <div className={classes.wrapperCard}>
        {stores?.map(data => (
          <CardToko
            key={data.id}
            srcImage=""
            nama={data.name}
            status={data.status?.name === 'Approved' ? 'aktif' : 'tidak aktif'}
            alamat={data.address}
            bukaSejak={data.joinedAt && dateConverterRes(data.joinedAt)}
            handleDetail={() => history.push(`/toko/${data.id}`)}
          />
        ))}
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) =>
          getStores('', '', value).then(res => {
            setStores(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          })
        }
      />
    </div>
  );
};

export default ListToko;
