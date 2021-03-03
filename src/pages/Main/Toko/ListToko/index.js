import { useEffect, useState } from 'react';
import useStyles from './styles';

// skeleton
import { Skeleton } from '@material-ui/lab';

// debonce untuk fitur pencarian
import { debounce } from 'debounce';

// material-ui core
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select
} from '@material-ui/core';

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

  const [skeleton, setSkeleton] = useState(false);

  // data stores
  const [stores, setStores] = useState([]);

  useEffect(() => {
    setSkeleton(true);

    setTimeout(() => {
      getStores().then(res => {
        setSkeleton(false);
        setStores(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setLastPage(res.data.meta.last_page);
      });
    }, 1000);
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
              setSkeleton(true);

              getStores(parseInt(e.target.value)).then(res => {
                setSkeleton(false);
                setStores(res.data.data);
                setCurrentPage(res.data.meta.current_page);
                setLastPage(res.data.meta.last_page);
              });
            }}
            label="Semua Status">
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="1">Aktif</MenuItem>
            <MenuItem value="2">Tidak aktif</MenuItem>
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
            onChange={debounce(e => {
              setSkeleton(true);

              getStores('', e.target.value).then(res => {
                setSkeleton(false);
                setStores(res.data.data);
                setCurrentPage(res.data.meta.current_page);
                setLastPage(res.data.meta.last_page);
              });
            }, 1000)}
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div
        className={
          skeleton
            ? classes.wrapperCard
            : stores.length > 0
            ? classes.wrapperCard
            : classes.noData
        }>
        {skeleton ? (
          Array.from(Array(10)).map((v, i) => (
            <div className={classes.card} key={i}>
              <div className={classes.info}>
                <Skeleton
                  variant="rect"
                  width={130}
                  height={100}
                  animation="wave"
                />
                <div className={classes.text}>
                  <Skeleton variant="text" width={250} animation="wave" />
                  <Skeleton variant="text" width={250} animation="wave" />
                  <Skeleton variant="text" width={250} animation="wave" />
                  <Skeleton variant="text" width={250} animation="wave" />
                  <Skeleton variant="text" width={250} animation="wave" />
                </div>
              </div>
            </div>
          ))
        ) : stores.length > 0 ? (
          stores?.map(data => (
            <CardToko
              key={data.id}
              srcImage={data.image}
              nama={data.name}
              status={data.status?.name === 'Active' ? 'aktif' : 'tidak aktif'}
              alamat={data.address}
              bukaSejak={data.joinedAt && dateConverterRes(data.joinedAt)}
              handleDetail={() => history.push(`/toko/${data.id}`)}
            />
          ))
        ) : (
          <span>Maaf. Saat ini data tidak tersedia!</span>
        )}
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) => {
          setSkeleton(true);

          getStores('', '', value).then(res => {
            setSkeleton(false);
            setStores(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });
        }}
      />
    </div>
  );
};

export default ListToko;
