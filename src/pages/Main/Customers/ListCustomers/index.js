import { useEffect, useState } from 'react';
import useStyles from './styles';

// skeleton
import { Skeleton } from '@material-ui/lab';

// debonce untuk fitur pencarian
import { debounce } from 'debounce';

// material-ui core
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { CardCustomers, Paginasi } from 'components';

// services
import { getCustomers } from 'services';

function ListCustomers({ history }) {
  const classes = useStyles();

  // data filter role
  const [roles] = useState([
    { name: 'Semua Role', value: '' },
    { name: 'Customer', value: 'customer' },
    { name: 'Super Admin Merchant', value: 'super-admin-merchant' },
    { name: 'Admin Merchant', value: 'admin-merchant' },
    { name: 'Contributor Merchant', value: 'contributor-merchant' },
    { name: 'Finance Merchant', value: 'finance-merchant' },
    { name: 'Admin Ecommerce', value: 'admin-ecommerce' },
    { name: 'Contributor Ecommerce', value: 'contributor-ecommerce' },
    { name: 'Finance Ecommerce', value: 'finance-ecommerce' }
  ]);

  // data paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data hasil pencarian
  const [count, setCount] = useState(0);

  const [skeleton, setSkeleton] = useState(false);

  // data customers
  const [customers, setCustomers] = useState([]);

  // read data customers
  useEffect(() => {
    setSkeleton(true);

    setTimeout(() => {
      getCustomers().then(res => {
        setSkeleton(false);
        setCustomers(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setLastPage(res.data.meta.last_page);
      });
    }, 1000);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <div className={classes.hasilPencarian}>
          <span>{`Hasil Pencarian : ${count ? count : 0}`}</span>
        </div>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-role">Semua Role</InputLabel>
          <Select
            labelId="select-role"
            name="select-role"
            id="select-role"
            onChange={e => {
              setSkeleton(true);

              getCustomers(e.target.value).then(res => {
                setSkeleton(false);
                setCustomers(res.data.data);
                setCurrentPage(res.data.meta.current_page);
                setLastPage(res.data.meta.last_page);
              });
            }}
            label="Semua Role">
            {roles?.map((role, index) => (
              <MenuItem key={index} value={role.value}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="cari"
            id="cari"
            color="primary"
            placeholder="Cari"
            onChange={debounce(e => {
              setSkeleton(true);

              getCustomers('', e.target.value).then(res => {
                setSkeleton(false);
                setCustomers(res.data.data);
                setCount(res.data.count);
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
            : customers.length > 0
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
              <div className={classes.garis}></div>
              <div className={classes.role}>
                <Skeleton
                  variant="rect"
                  width={60}
                  height={25}
                  animation="wave"
                />
              </div>
            </div>
          ))
        ) : customers.length > 0 ? (
          customers.map(user => (
            <CardCustomers
              key={user.id}
              nama={user.name}
              srcImage={user.image}
              status={
                user.statusUser?.name === 'Active' ? 'aktif' : 'tidak aktif'
              }
              jenisKelamin={
                user.gender?.id !== ''
                  ? user.gender?.id === 1
                    ? 'Laki-Laki'
                    : 'Perempuan'
                  : null
              }
              email={user.email}
              noTelp={user.phone}
              roles={user.roles}
              handleDetail={() => history.push(`/user/${user.id}`)}
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

          getCustomers('', '', value).then(res => {
            setSkeleton(false);
            setCustomers(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });
        }}
      />
    </div>
  );
}

export default ListCustomers;
